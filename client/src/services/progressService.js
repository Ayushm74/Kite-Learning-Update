import api from "../utils/api.js";

export const markLessonComplete = async ({ courseId, lessonId }) => {
  const { data } = await api.post("/progress/complete", { courseId, lessonId });
  return data;
};

export const getCourseProgress = async (courseId) => {
  const { data } = await api.get(`/progress/${courseId}`);
  return data;
};

