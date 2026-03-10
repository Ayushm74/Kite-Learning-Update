import express from "express";
import { body } from "express-validator";
import {
  getLessonsByCourse,
  createLesson,
} from "../controllers/lessonController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/courses/:courseId/lessons", getLessonsByCourse);

router.post(
  "/lessons",
  protect,
  adminOnly,
  [
    body("courseId").notEmpty().withMessage("courseId is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("videoUrl").notEmpty().withMessage("videoUrl is required"),
    body("order").isInt().withMessage("Order must be an integer"),
  ],
  createLesson
);

export default router;

