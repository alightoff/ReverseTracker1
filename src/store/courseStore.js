import { create } from "zustand";

export const useCourseStore = create((set, get) => ({
  // Текущий активный курс
  activeCourse: null,
  setActiveCourse: (course) => {
    set({ activeCourse: course });
    localStorage.setItem("activeCourse", JSON.stringify(course));
  },

  // Приватные пользовательские курсы
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

  // Глобальные курсы, ожидающие модерации
  publicSubmits: JSON.parse(localStorage.getItem("publicSubmits")) || [],
  addPublicSubmit: (course) => {
    const updated = [...get().publicSubmits, course];
    set({ publicSubmits: updated });
    localStorage.setItem("publicSubmits", JSON.stringify(updated));
  },

  // Очистить все
  clearAllCourses: () => {
    set({
      userCourses: [],
      publicSubmits: [],
      activeCourse: null,
    });
    localStorage.removeItem("userCourses");
    localStorage.removeItem("publicSubmits");
    localStorage.removeItem("activeCourse");
  },
}));
