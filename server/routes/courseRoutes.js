import express from "express";
import { body } from "express-validator";
import {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getCourses);
router.get("/:id", getCourseById);

router.post(
  "/",
  protect,
  adminOnly,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("instructor").notEmpty().withMessage("Instructor is required"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  createCourse
);

router.delete("/:id", protect, adminOnly, deleteCourse);

export default router;

