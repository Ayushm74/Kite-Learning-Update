import api from "../utils/api.js";

export const getCourses = async (params = {}) => {
  const { data } = await api.get("/courses", { params });
  return data;
};

export const getCourseById = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};

export const getLessonsByCourse = async (courseId) => {
  const { data } = await api.get(`/courses/${courseId}/lessons`);
  return data;
};

export const createCourse = async (payload) => {
  const { data } = await api.post("/courses", payload);
  return data;
};

export const deleteCourse = async (id) => {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
};

export const enrollInCourse = async (courseId) => {
  const { data } = await api.post(`/enroll/${courseId}`);
  return data;
};

export const getMyCourses = async () => {
  const { data } = await api.get("/my-courses");
  return data;
};

