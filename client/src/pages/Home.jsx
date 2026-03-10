import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../services/courseService.js";
import CourseCard from "../components/CourseCard.jsx";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCourses({ limit: 6 })
      .then(setCourses)
      .catch(() => {});
  }, []);

  return (
    <div className="pt-20 pb-10 px-4">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-3">
            Futuristic Learning Platform
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">
            Level up your skills in a{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              modern dark-tech
            </span>{" "}
            classroom.
          </h1>
          <p className="text-sm text-textSecondary mb-6 max-w-md">
            Learn from curated courses, track your progress, and master new
            skills with a glassmorphism, AI-inspired interface designed for deep
            focus.
          </p>
          <div className="flex gap-3">
            <Link to="/courses" className="primary-gradient-btn text-xs">
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-full border border-primary/60 text-xs text-textSecondary hover:text-primary hover:border-primary transition"
            >
              Start for Free
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="glass-card p-4 shadow-neumorph">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/50 via-background to-secondary/40 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-secondary/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-secondary/70 flex items-center justify-center">
                  <span className="text-background text-xs font-bold tracking-widest">
                    ▶
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs text-textSecondary">
              Immersive video-first experience with lesson tracking and
              progress analytics.
            </p>
          </div>
          <div className="absolute -bottom-6 -left-4 glass-card px-4 py-3 text-[11px]">
            <p className="text-textSecondary mb-1">Live Progress</p>
            <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Featured Courses</h2>
          <Link
            to="/courses"
            className="text-xs text-textSecondary hover:text-secondary"
          >
            View all
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
          {courses.length === 0 && (
            <p className="text-xs text-textSecondary">
              No courses yet. Login as admin to create one.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

