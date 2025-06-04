import { useState } from "react";
import { useCourseStore } from "../../store/courseStore";

export default function MyCoursesPage() {
  const {
    userCourses,
    addUserCourse,
    removeUserCourse,
    addPublicSubmit,
  } = useCourseStore();

  const [jsonInput, setJsonInput] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [error, setError] = useState("");

  const handleAddCourse = () => {
    try {
      const parsed = JSON.parse(jsonInput);

      if (!parsed.id || !parsed.name || !Array.isArray(parsed.chapters)) {
        throw new Error("Некорректная структура курса");
      }

      if (privacy === "private") {
        addUserCourse(parsed);
      } else {
        addPublicSubmit(parsed);
        alert("Курс отправлен на модерацию.");
      }

      setJsonInput("");
      setPrivacy("private");
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-hackerGreen mb-4">📦 Мои курсы</h1>

      {/* Пример структуры */}
      <div className="mb-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded">
        <h2 className="font-semibold text-lg mb-2">Пример структуры курса</h2>
        <pre className="text-xs whitespace-pre-wrap break-words">
{`{
  "id": "js-custom",
  "name": "JS Курс",
  "description": "Пользовательский курс по JavaScript",
  "chapters": [
    {
      "id": "intro",
      "title": "Введение",
      "topics": [
        {
          "id": "vars",
          "title": "Переменные",
          "description": "let, const",
          "done": false
        }
      ]
    }
  ]
}`}
        </pre>
      </div>

      {/* Поле для JSON */}
      <textarea
        rows={8}
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        className="w-full p-3 border rounded bg-white dark:bg-zinc-900 text-sm dark:text-white"
        placeholder="Вставьте JSON-курс сюда..."
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}

      {/* Радиокнопки */}
      <div className="flex items-center gap-4 mt-2 mb-3 text-sm text-zinc-700 dark:text-zinc-300">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="privacy"
            value="private"
            checked={privacy === "private"}
            onChange={() => setPrivacy("private")}
          />
          Приватный курс
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="privacy"
            value="public"
            checked={privacy === "public"}
            onChange={() => setPrivacy("public")}
          />
          Отправить на модерацию
        </label>
      </div>

      <button
        onClick={handleAddCourse}
        className="mt-1 px-4 py-2 bg-hackerGreen text-black rounded hover:opacity-90"
      >
        ➕ Добавить курс
      </button>

      {/* Список курсов */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Ваши курсы:</h2>
        {userCourses.length === 0 && (
          <p className="text-zinc-500">Нет добавленных курсов.</p>
        )}
        {userCourses.map((course) => (
          <div
            key={course.id}
            className="p-4 border rounded bg-zinc-100 dark:bg-zinc-800 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-hackerGreen">{course.name}</p>
              <p className="text-sm text-zinc-500">{course.description}</p>
            </div>
            <button
              onClick={() => removeUserCourse(course.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:opacity-90"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
