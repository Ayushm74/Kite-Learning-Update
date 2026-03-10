import { validationResult } from "express-validator";
import { Progress } from "../models/Progress.js";
import { calculateProgress } from "../utils/calculateProgress.js";

export const markLessonComplete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { courseId, lessonId } = req.body;

  try {
    let progress = await Progress.findOne({
      userId: req.user._id,
      courseId,
    });

    if (!progress) {
      progress = await Progress.create({
        userId: req.user._id,
        courseId,
        completedLessons: [lessonId],
        percentage: 0,
      });
    } else {
      if (
        !progress.completedLessons
          .map((id) => id.toString())
          .includes(lessonId)
      ) {
        progress.completedLessons.push(lessonId);
      }
    }

    progress.percentage = await calculateProgress({
      courseId,
      completedLessonIds: progress.completedLessons,
    });

    await progress.save();

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      userId: req.user._id,
      courseId,
    }).populate("completedLessons");

    if (!progress) {
      return res.json({
        userId: req.user._id,
        courseId,
        completedLessons: [],
        percentage: 0,
      });
    }

    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

