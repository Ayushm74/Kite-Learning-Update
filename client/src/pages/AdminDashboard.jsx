import React, { useEffect, useState } from "react";
import {
  createCourse,
  deleteCourse,
  getCourses
} from "../services/courseService.js";
import { getLessonsByCourse } from "../services/courseService.js";
import { default as api } from "../utils/api.js";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    instructor: "",
    thumbnail: "",
    price: 0,
    category: ""
  });
  const [lessonForm, setLessonForm] = useState({
    courseId: "",
    title: "",
    videoUrl: "",
    duration: "",
    order: 1
  });

  const loadCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch {
      setCourses([]);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCourseChange = (e) => {
    const value =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setCourseForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleLessonChange = (e) => {
    const value =
      e.target.name === "order" || e.target.name === "duration"
        ? Number(e.target.value)
        : e.target.value;
    setLessonForm((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    try {
      await createCourse(courseForm);
      setCourseForm({
        title: "",
        description: "",
        instructor: "",
        thumbnail: "",
        price: 0,
        category: ""
      });
      loadCourses();
    } catch {
      // ignore
    }
  };

  const submitLesson = async (e) => {
    e.preventDefault();
    try {
      await api.post("/lessons", lessonForm);
      setLessonForm((prev) => ({
        ...prev,
        title: "",
        videoUrl: "",
        duration: "",
        order: prev.order + 1
      }));
    } catch {
      // ignore
    }
  };

  const handleDeleteCourse = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  return (
    <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <form onSubmit={submitCourse} className="glass-card p-4 space-y-3">
          <h2 className="text-sm font-semibold mb-1">Create Course</h2>
          <input
            type="text"
            name="title"
            value={courseForm.title}
            onChange={handleCourseChange}
            placeholder="Title"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <textarea
            name="description"
            value={courseForm.description}
            onChange={handleCourseChange}
            placeholder="Description"
            rows="3"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <input
            type="text"
            name="instructor"
            value={courseForm.instructor}
            onChange={handleCourseChange}
            placeholder="Instructor"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <input
            type="text"
            name="thumbnail"
            value={courseForm.thumbnail}
            onChange={handleCourseChange}
            placeholder="Thumbnail URL (optional)"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <div className="flex gap-3">
            <input
              type="number"
              name="price"
              value={courseForm.price}
              onChange={handleCourseChange}
              placeholder="Price"
              className="w-1/2 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
            <input
              type="text"
              name="category"
              value={courseForm.category}
              onChange={handleCourseChange}
              placeholder="Category"
              className="w-1/2 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
          </div>
          <button type="submit" className="primary-gradient-btn text-xs w-full">
            Save Course
          </button>
        </form>

        <form onSubmit={submitLesson} className="glass-card p-4 space-y-3">
          <h2 className="text-sm font-semibold mb-1">Upload Lesson</h2>
          <select
            name="courseId"
            value={lessonForm.courseId}
            onChange={handleLessonChange}
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option
                key={course._id}
                value={course._id}
                className="bg-background"
              >
                {course.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            value={lessonForm.title}
            onChange={handleLessonChange}
            placeholder="Lesson title"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <input
            type="text"
            name="videoUrl"
            value={lessonForm.videoUrl}
            onChange={handleLessonChange}
            placeholder="Video URL (YouTube / Cloudinary)"
            className="w-full bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
          />
          <div className="flex gap-3">
            <input
              type="number"
              name="duration"
              value={lessonForm.duration}
              onChange={handleLessonChange}
              placeholder="Duration (min)"
              className="w-1/2 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
            <input
              type="number"
              name="order"
              value={lessonForm.order}
              onChange={handleLessonChange}
              placeholder="Order"
              className="w-1/2 bg-transparent border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-secondary"
            />
          </div>
          <button type="submit" className="primary-gradient-btn text-xs w-full">
            Add Lesson
          </button>
        </form>
      </div>

      <div className="glass-card p-4">
        <h2 className="text-sm font-semibold mb-3">Manage Courses</h2>
        <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
          {courses.map((course) => (
            <div
              key={course._id}
              className="flex items-center justify-between border border-white/5 rounded-lg px-3 py-2"
            >
              <div>
                <p className="font-medium">{course.title}</p>
                <p className="text-[11px] text-textSecondary">
                  {course.category} • {course.lessons?.length || 0} lessons
                </p>
              </div>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="text-[11px] text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="text-[11px] text-textSecondary">
              No courses yet. Create one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

