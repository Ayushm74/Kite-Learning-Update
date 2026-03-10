import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="glass-card p-4 flex flex-col justify-between glow-hover">
      <div>
        <div className="relative mb-3 overflow-hidden rounded-xl">
          <div className="aspect-video bg-gradient-to-br from-primary/40 to-secondary/30 flex items-center justify-center">
            {course.thumbnail ? (
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-textSecondary">
                No thumbnail
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <span className="absolute bottom-2 left-2 text-xs px-2 py-1 rounded-full bg-black/60 text-textSecondary">
            {course.category}
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-textSecondary mb-2 line-clamp-2">
          {course.description}
        </p>
        <p className="text-[11px] text-textSecondary mb-1">
          By {course.instructor}
        </p>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="text-primary font-semibold text-sm">
          {course.price > 0 ? `₹${course.price}` : "Free"}
        </span>
        <Link
          to={`/courses/${course._id}`}
          className="primary-gradient-btn text-[11px] px-4 py-1.5"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

