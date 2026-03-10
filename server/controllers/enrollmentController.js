import { Course } from "../models/Course.js";
import { User } from "../models/User.js";

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(req.user._id);
    const alreadyEnrolled = user.enrolledCourses.some(
      (c) => c.course.toString() === courseId
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in course" });
    }

    user.enrolledCourses.push({ course: courseId });
    await user.save();

    res.status(200).json({ message: "Enrolled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "enrolledCourses.course",
      populate: { path: "lessons" },
    });
    res.json(user.enrolledCourses.map((c) => c.course));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

