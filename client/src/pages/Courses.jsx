import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { getCourses } from "../services/courseService.js";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchCourses = async (params = {}) => {
    try {
      const data = await getCourses(params);
      setCourses(data);
    } catch {
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCourses({ search, category });
  };

  return (
    <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">All Courses</h1>
      <form
        onSubmit={handleSearch}
        className="glass-card p-3 mb-5 flex flex-col md:flex-row gap-3 items-center"
      >
        <input
          type="text"
          placeholder="Search for a course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:flex-1 bg-transparent border border-white/10 rounded-full px-3 py-2 text-xs outline-none focus:border-secondary"
        />
        <input
          type="text"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full md:w-40 bg-transparent border border-white/10 rounded-full px-3 py-2 text-xs outline-none focus:border-secondary"
        />
        <button type="submit" className="primary-gradient-btn text-xs">
          Search
        </button>
      </form>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
        {courses.length === 0 && (
          <p className="text-xs text-textSecondary">
            No courses found. Try adjusting your search filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default Courses;

