import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../services/courseService.js";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getMyCourses()
      .then(setCourses)
      .catch(() => setCourses([]));
  }, []);

  return (
    <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">My Courses</h1>
      {courses.length === 0 && (
        <p className="text-xs text-textSecondary">
          You are not enrolled in any courses yet.{" "}
          <Link to="/courses" className="text-secondary">
            Browse courses
          </Link>
          .
        </p>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/player/${course._id}`}
            className="glass-card p-4 glow-hover"
          >
            <h3 className="font-semibold text-sm mb-1">{course.title}</h3>
            <p className="text-[11px] text-textSecondary mb-2">
              {course.instructor}
            </p>
            <p className="text-[11px] text-textSecondary line-clamp-2">
              {course.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;

