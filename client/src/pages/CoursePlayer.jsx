import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseById,
  getLessonsByCourse
} from "../services/courseService.js";
import {
  getCourseProgress,
  markLessonComplete
} from "../services/progressService.js";
import LessonList from "../components/LessonList.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState({ percentage: 0, completedLessons: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const [courseData, lessonData, progressData] = await Promise.all([
          getCourseById(courseId),
          getLessonsByCourse(courseId),
          getCourseProgress(courseId)
        ]);
        setCourse(courseData);
        setLessons(lessonData);
        setProgress(progressData);
        setCurrentLesson(lessonData[0] || null);
      } catch {
        setCourse(null);
      }
    };
    load();
  }, [courseId]);

  const handleMarkCompleted = async () => {
    if (!currentLesson) return;
    try {
      const updated = await markLessonComplete({
        courseId,
        lessonId: currentLesson._id
      });
      setProgress(updated);
    } catch {
      // ignore
    }
  };

  const isCompleted = (lessonId) =>
    progress.completedLessons?.some((l) => l === lessonId || l._id === lessonId);

  if (!course) {
    return (
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <p className="text-sm text-textSecondary">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 px-4 max-w-6xl mx-auto">
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-semibold">{course.title}</h1>
          <p className="text-[11px] text-textSecondary">
            By {course.instructor} • {lessons.length} lessons
          </p>
        </div>
        <div className="w-full md:w-64">
          <p className="text-[11px] text-textSecondary mb-1">
            Progress: {progress.percentage || 0}%
          </p>
          <div className="w-full h-1.5 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress.percentage || 0}%` }}
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-[1.9fr,1.1fr] gap-6">
        <div className="space-y-3">
          <VideoPlayer videoUrl={currentLesson?.videoUrl} />
          <div className="glass-card p-3 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">
                {currentLesson ? currentLesson.title : "No lesson selected"}
              </p>
              {currentLesson?.duration && (
                <p className="text-[11px] text-textSecondary mt-1">
                  {currentLesson.duration} min
                </p>
              )}
            </div>
            {currentLesson && (
              <button
                onClick={handleMarkCompleted}
                className="primary-gradient-btn text-[11px] px-4 py-1.5"
              >
                {isCompleted(currentLesson._id)
                  ? "Completed"
                  : "Mark as completed"}
              </button>
            )}
          </div>
        </div>
        <div className="glass-card p-3 flex flex-col">
          <p className="text-xs font-semibold mb-2">Lessons</p>
          <LessonList
            lessons={lessons}
            currentLessonId={currentLesson?._id}
            onSelect={setCurrentLesson}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;

