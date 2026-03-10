import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: false,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

lessonSchema.index({ courseId: 1, order: 1 });

export const Lesson = mongoose.model("Lesson", lessonSchema);

