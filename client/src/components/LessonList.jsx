import React from "react";

const LessonList = ({ lessons, currentLessonId, onSelect }) => {
  return (
    <div className="h-full overflow-y-auto space-y-2 pr-2">
      {lessons.map((lesson, idx) => {
        const isActive = currentLessonId === lesson._id;
        return (
          <button
            key={lesson._id}
            onClick={() => onSelect(lesson)}
            className={`w-full text-left text-xs p-3 rounded-xl border ${
              isActive
                ? "bg-primary/30 border-primary/70"
                : "bg-surface/60 border-white/5 hover:border-primary/40"
            } transition flex gap-2 items-start`}
          >
            <span className="text-[10px] text-textSecondary mt-0.5">
              {idx + 1}
            </span>
            <div className="flex-1">
              <p className="font-medium">{lesson.title}</p>
              {lesson.duration && (
                <p className="text-[10px] text-textSecondary mt-1">
                  {lesson.duration} min
                </p>
              )}
            </div>
          </button>
        );
      })}
      {lessons.length === 0 && (
        <p className="text-xs text-textSecondary mt-4">
          No lessons available yet.
        </p>
      )}
    </div>
  );
};

export default LessonList;

