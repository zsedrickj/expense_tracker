import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    transactionDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

/**
 * 🔥 OPTIMIZED INDEXES
 */
console.time("QueryTime");
// 1️⃣ For getting transactions per user sorted by latest
TransactionSchema.index({ userId: 1, transactionDate: -1 });

// 2️⃣ For filtering per user + category
TransactionSchema.index({ userId: 1, categoryId: 1 });
console.timeEnd("QueryTime");
// 3️⃣ Optional: for monthly or date range heavy filtering
TransactionSchema.index({ userId: 1, transactionDate: 1 });

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
