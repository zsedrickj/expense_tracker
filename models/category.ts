import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// 🔥 Compound index for real usage
CategorySchema.index({ userId: 1, type: 1 });

// Prevent duplicate category names per user
CategorySchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
