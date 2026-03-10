import express from "express";
import { body } from "express-validator";
import {
  markLessonComplete,
  getCourseProgress,
} from "../controllers/progressController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/progress/complete",
  protect,
  [
    body("courseId").notEmpty().withMessage("courseId is required"),
    body("lessonId").notEmpty().withMessage("lessonId is required"),
  ],
  markLessonComplete
);

router.get("/progress/:courseId", protect, getCourseProgress);

export default router;

