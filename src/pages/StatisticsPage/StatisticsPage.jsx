import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/Header/Header";
import { useCourseStore } from "../../store/courseStore";
import { toast } from "react-toastify";

// Простая карточка статистики
function StatCard({ label, value }) {
  return (
    <div className="p-5 bg-zinc-200 dark:bg-zinc-800 border dark:border-zinc-700 rounded shadow">
      <div className="text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
      <div className="text-2xl font-bold text-emerald-600 dark:text-hackerGreen">
        {value}
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  const activeCourse = useCourseStore((state) => state.activeCourse);
  const topicStates = useCourseStore((state) => state.topicStates);

  const [summary, setSummary] = useState({
    totalTopics: 0,
    doneTopics: 0,
    avgTime: 0,
    avgRating: 0,
  });

  useEffect(() => {
    if (!activeCourse) return;

    // Все темы плоско
    const allTopics = activeCourse.chapters.flatMap((chapter) => chapter.topics);
    const totalTopics = allTopics.length;

    // Темы, которые выполнены
    const doneTopicsArray = allTopics.filter((_, idx) => {
      const chapterIndex = Math.floor(idx / (allTopics.length / activeCourse.chapters.length));
      // Лучше получить индекс темы через двойной цикл, ниже более точный подсчёт
      return false; // временно заглушка, будет позже
    });

    // Чтобы точнее — считаем done темы с использованием topicStates и ключей
    let doneCount = 0;
    let totalMinutes = 0;
    let totalRating = 0;
    let ratedCount = 0;

    activeCourse.chapters.forEach((chapter, ci) => {
      chapter.topics.forEach((topic, ti) => {
        const key = `${activeCourse.id}-c${ci}-t${ti}`;
        const state = topicStates[key];
        if (state?.done) {
          doneCount++;
          totalMinutes += state.minutes ?? 0;
          if (state.rating != null) {
            totalRating += state.rating;
            ratedCount++;
          }
        }
      });
    });

    const avgTime = doneCount > 0 ? Math.round(totalMinutes / doneCount) : 0;
    const avgRating = ratedCount > 0 ? (totalRating / ratedCount).toFixed(1) : "—";

    setSummary({
      totalTopics,
      doneTopics: doneCount,
      avgTime,
      avgRating,
    });
  }, [activeCourse, topicStates]);

  if (!activeCourse) {
    return (
      <div className="p-6 text-center">
        <Header />
        <p className="mt-20 text-lg">Курс не выбран. Пожалуйста, выберите курс.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-hackerBlack text-black dark:text-white px-6 py-10">
      <Header />
      <div className="max-w-5xl mx-auto mt-12 space-y-10">
        <h1 className="text-3xl font-bold text-hackerGreen">📊 Статистика</h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StatCard label="Всего тем" value={summary.totalTopics} />
          <StatCard label="Пройдено тем" value={summary.doneTopics} />
          <StatCard label="Среднее время (мин)" value={summary.avgTime} />
          <StatCard label="Средняя оценка" value={summary.avgRating} />
        </motion.div>

        {/* Здесь можно добавить графики и таблицы позже */}

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-hackerGreen mb-2">Обзор по главам</h2>
          <table className="w-full border-collapse border border-zinc-300 dark:border-zinc-700">
            <thead>
              <tr className="bg-zinc-200 dark:bg-zinc-800">
                <th className="border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-left">Глава</th>
                <th className="border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-left">Всего тем</th>
                <th className="border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-left">Пройдено</th>
              </tr>
            </thead>
            <tbody>
              {activeCourse.chapters.map((chapter, ci) => {
                const total = chapter.topics.length;
                let done = 0;
                chapter.topics.forEach((_, ti) => {
                  const key = `${activeCourse.id}-c${ci}-t${ti}`;
                  if (topicStates[key]?.done) done++;
                });
                return (
                  <tr key={ci} className="hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <td className="border border-zinc-300 dark:border-zinc-700 px-4 py-2">{chapter.title}</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 px-4 py-2">{total}</td>
                    <td className="border border-zinc-300 dark:border-zinc-700 px-4 py-2">{done}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
