import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../../store/courseStore";

export default function CourseSelector() {
  const { activeCourse, setActiveCourse, userCourses } = useCourseStore();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const defaultCourses = [
      {
        id: "cpp",
        name: "Основы C++",
        description: "Изучите язык C++ шаг за шагом.",
        chapters: [
          {
            id: "intro",
            title: "Введение",
            topics: [
              { id: "setup", title: "Установка", description: "Компиляторы", done: false },
              { id: "syntax", title: "Синтаксис", description: "Первая программа", done: false }
            ]
          }
        ]
      }
    ];
    setCourses([...defaultCourses, ...userCourses]);
  }, [userCourses]);

  const handleSelect = (course) => {
    setActiveCourse(course);
    navigate("/course");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {courses.map((course) => (
        <motion.button
          key={course.id}
          onClick={() => handleSelect(course)}
          className={`p-5 text-left rounded-lg border transition-colors shadow-md
            ${
              activeCourse?.id === course.id
                ? "border-hackerGreen bg-zinc-100 dark:bg-zinc-800"
                : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
            }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <h2 className="text-lg font-semibold text-hackerGreen">{course.name}</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{course.description}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Глав: {course.chapters?.length ?? 0} / Тем:{" "}
            {course.chapters?.reduce((acc, ch) => acc + ch.topics.length, 0) ?? 0}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
