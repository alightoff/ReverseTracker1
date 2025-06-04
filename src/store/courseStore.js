import { create } from "zustand";

export const useCourseStore = create((set, get) => ({
  // Активный курс
  activeCourse: null,
  setActiveCourse: (course) => {
    set({ activeCourse: course });
    localStorage.setItem("activeCourse", JSON.stringify(course));
  },

  // Пользовательские курсы (приватные)
  userCourses: JSON.parse(localStorage.getItem("userCourses")) || [],
  addUserCourse: (course) => {
    const updated = [...get().userCourses, course];
    set({ userCourses: updated });
    localStorage.setItem("userCourses", JSON.stringify(updated));
  },
  removeUserCourse: (id) => {
    const updated = get().userCourses.filter((c) => c.id !== id);
    set({ userCourses: updated });
    localStorage.setItem("userCourses", JSON.stringify(updated));
  },

  // Публичные (на модерации)
  publicSubmits: JSON.parse(localStorage.getItem("publicSubmits")) || [],
  addPublicSubmit: (course) => {
    const updated = [...get().publicSubmits, course];
    set({ publicSubmits: updated });
    localStorage.setItem("publicSubmits", JSON.stringify(updated));
  },
}));
