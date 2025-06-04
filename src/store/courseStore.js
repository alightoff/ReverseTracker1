import { create } from "zustand";

const getStoredActiveCourse = () => {
  try {
    const stored = localStorage.getItem("activeCourse");
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const getStoredUserCourses = () => {
  try {
    const stored = localStorage.getItem("userCourses");
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const useCourseStore = create((set, get) => {
  const userCoursesInit = getStoredUserCourses();
  let activeCourseInit = getStoredActiveCourse();

  if (
    activeCourseInit &&
    !userCoursesInit.find((course) => course.id === activeCourseInit.id)
  ) {
    activeCourseInit = null;
    localStorage.removeItem("activeCourse");
  }

  return {
    activeCourse: activeCourseInit,
    setActiveCourse: (course) => {
      set({ activeCourse: course });
      localStorage.setItem("activeCourse", JSON.stringify(course));
    },

    userCourses: userCoursesInit,
    addUserCourse: (course) => {
      const updated = [...get().userCourses, course];
      set({ userCourses: updated });
      localStorage.setItem("userCourses", JSON.stringify(updated));
    },
    removeUserCourse: (id) => {
      const updated = get().userCourses.filter((c) => c.id !== id);
      set({ userCourses: updated });

      const { activeCourse } = get();
      if (activeCourse && activeCourse.id === id) {
        set({ activeCourse: null });
        localStorage.removeItem("activeCourse");
      }

      localStorage.setItem("userCourses", JSON.stringify(updated));
    },

    publicSubmits: JSON.parse(localStorage.getItem("publicSubmits")) || [],
    addPublicSubmit: (course) => {
      const updated = [...get().publicSubmits, course];
      set({ publicSubmits: updated });
      localStorage.setItem("publicSubmits", JSON.stringify(updated));
    },

    topicStates: JSON.parse(localStorage.getItem("topicStates")) || {},

    // Новое состояние для выбранной темы заметок
    selectedNoteTopic: null,
    setSelectedNoteTopic: (topic) => set({ selectedNoteTopic: topic }),
    clearSelectedNoteTopic: () => set({ selectedNoteTopic: null }),

    setTopicDoneWithDate: (chapterIndex, topicIndex, done, extras = {}) => {
      const { activeCourse, topicStates } = get();
      if (!activeCourse) return;
      const key = `${activeCourse.id}-c${chapterIndex}-t${topicIndex}`;
      const updated = {
        ...topicStates,
        [key]: {
          ...topicStates[key],
          done,
          lastDoneDate: done ? (extras.date ?? new Date().toISOString()) : null,
          minutes: done ? (extras.minutes ?? topicStates[key]?.minutes ?? 0) : 0,
          rating: done ? (extras.rating ?? topicStates[key]?.rating ?? 3) : null,
          note: done ? (extras.note ?? topicStates[key]?.note ?? "") : null,
        },
      };
      set({ topicStates: updated });
      localStorage.setItem("topicStates", JSON.stringify(updated));
    },

    setTopicNote: (chapterIndex, topicIndex, note) => {
      const { activeCourse, topicStates } = get();
      if (!activeCourse) return;
      const key = `${activeCourse.id}-c${chapterIndex}-t${topicIndex}`;
      const updated = {
        ...topicStates,
        [key]: {
          ...topicStates[key],
          note,
        },
      };
      set({ topicStates: updated });
      localStorage.setItem("topicStates", JSON.stringify(updated));
    },

    setTopicRating: (chapterIndex, topicIndex, rating) => {
      const { activeCourse, topicStates } = get();
      if (!activeCourse) return;
      const key = `${activeCourse.id}-c${chapterIndex}-t${topicIndex}`;
      const updated = {
        ...topicStates,
        [key]: {
          ...topicStates[key],
          rating,
        },
      };
      set({ topicStates: updated });
      localStorage.setItem("topicStates", JSON.stringify(updated));
    },

    setTopicMinutes: (chapterIndex, topicIndex, minutes) => {
      const { activeCourse, topicStates } = get();
      if (!activeCourse) return;
      const key = `${activeCourse.id}-c${chapterIndex}-t${topicIndex}`;
      const updated = {
        ...topicStates,
        [key]: {
          ...topicStates[key],
          minutes,
        },
      };
      set({ topicStates: updated });
      localStorage.setItem("topicStates", JSON.stringify(updated));
    },

    setTopicNeedsRepeat: (chapterIndex, topicIndex, needsRepeat) => {
      const { activeCourse, topicStates } = get();
      if (!activeCourse) return;
      const key = `${activeCourse.id}-c${chapterIndex}-t${topicIndex}`;
      const updated = {
        ...topicStates,
        [key]: {
          ...topicStates[key],
          needsRepeat,
        },
      };
      set({ topicStates: updated });
      localStorage.setItem("topicStates", JSON.stringify(updated));
    },

    handleRepeatTopic: (chapterIndex, topicIndex) => {
      const { setTopicNeedsRepeat } = get();
      setTopicNeedsRepeat(chapterIndex, topicIndex, true);
    },

    clearAllCourses: () => {
      set({
        userCourses: [],
        publicSubmits: [],
        activeCourse: null,
        topicStates: {},
        selectedNoteTopic: null,
      });
      localStorage.removeItem("userCourses");
      localStorage.removeItem("publicSubmits");
      localStorage.removeItem("activeCourse");
      localStorage.removeItem("topicStates");
    },
  };
});
