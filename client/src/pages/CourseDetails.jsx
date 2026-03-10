import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCourseById,
  getLessonsByCourse,
  enrollInCourse,
} from "../services/courseService.js";
import { useAuth } from "../context/AuthContext.jsx";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const [courseData, lessonData] = await Promise.all([
          getCourseById(id),
          getLessonsByCourse(id),
        ]);
        setCourse(courseData);
        setLessons(lessonData);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      setEnrolling(true);
      await enrollInCourse(id);
      navigate(`/player/${id}`);
    } catch (e) {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="pt-20 px-4 max-w-3xl mx-auto">
        <p className="text-sm text-textSecondary">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-[2fr,1fr] gap-8">
        <div>
          <div className="glass-card overflow-hidden mb-4">
            <div className="aspect-video bg-gradient-to-br from-primary/40 to-secondary/30 flex items-center justify-center">
              {course.thumbnail ? (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-textSecondary">
                  Course preview
                </span>
              )}
            </div>
          </div>
          <h1 className="text-xl font-semibold mb-2">{course.title}</h1>
          <p className="text-xs text-textSecondary mb-3">
            By {course.instructor} • {course.category}
          </p>
          <p className="text-sm text-textSecondary mb-4">
            {course.description}
          </p>
        </div>
        <div className="glass-card p-4 h-fit">
          <p className="text-sm font-semibold mb-2">
            {course.price > 0 ? `₹${course.price}` : "Free course"}
          </p>
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="primary-gradient-btn w-full text-xs mb-3"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
          <p className="text-[11px] text-textSecondary mb-3">
            Lifetime access • Progress tracking • Certificate-ready
          </p>
          <div className="border-t border-white/10 pt-3 mt-3">
            <p className="text-xs font-medium mb-2">Course content</p>
            <ul className="space-y-1 max-h-52 overflow-y-auto text-[11px] text-textSecondary">
              {lessons.map((l, idx) => (
                <li key={l._id} className="flex justify-between">
                  <span>
                    {idx + 1}. {l.title}
                  </span>
                  {l.duration && <span>{l.duration} min</span>}
                </li>
              ))}
              {lessons.length === 0 && (
                <li>No lessons added yet.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

