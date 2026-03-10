import { Lesson } from "../models/Lesson.js";

export const calculateProgress = async ({ courseId, completedLessonIds }) => {
  const totalLessons = await Lesson.countDocuments({ courseId });
  if (!totalLessons || totalLessons === 0) return 0;

  const uniqueCompletedCount = new Set(
    completedLessonIds.map((id) => id.toString())
  ).size;

  const percentage = (uniqueCompletedCount / totalLessons) * 100;
  return Math.min(100, Math.round(percentage));
};

