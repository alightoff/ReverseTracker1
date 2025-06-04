import Header from "./components/Header/Header";
import CourseSelector from "./components/CourseSelector/CourseSelector";
import CourseDetailsPage from "./pages/CourseDetailsPage/CourseDetailsPage";
import MyCoursesPage from "./pages/MyCoursesPage/MyCoursesPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-hackerBlack dark:text-white">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<CourseSelector />} />
          <Route path="/course" element={<CourseDetailsPage />} />
          <Route path="/my-courses" element={<MyCoursesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
