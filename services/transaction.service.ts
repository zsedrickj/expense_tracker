/* eslint-disable @typescript-eslint/no-explicit-any */
// services/transaction.service.ts
import TransactionModel from "@/models/transaction"; // Mongoose model
import Category from "@/models/category";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  Transaction as TransactionDTO,
} from "@/types/transaction.types"; // TypeScript type
import { fetchTransactionsForDashboard } from "@/repository/transaction.repository";

/** Create a new transaction */
export const createTransaction = async (
  userId: string,
  data: CreateTransactionDTO,
): Promise<TransactionDTO> => {
  // 1️⃣ Get server-controlled category
  const category = await Category.findById(data.categoryId);
  if (!category) throw new Error("Category not found");

  // 2️⃣ Destructure only client fields (safe)
  const { title, amount, transactionDate } = data;

  // 3️⃣ Create transaction
  const transactionDoc = await TransactionModel.create({
    userId,
    categoryId: category._id,
    title,
    amount,
    transactionDate,
  });

  // 4️⃣ Map Mongo document → DTO
  return mapTransaction(transactionDoc);
};

/** Get all transactions of a user */
export const getUserTransactions = async (
  userId: string,
): Promise<TransactionDTO[]> => {
  const transactions = await TransactionModel.find({ userId })
    .sort({ transactionDate: -1 })
    .populate("categoryId", "name type"); // optional populate

  return transactions.map(mapTransaction);
};

/** Get single transaction by id */
export const getTransactionById = async (
  id: string,
): Promise<TransactionDTO | null> => {
  const transaction = await TransactionModel.findById(id).populate(
    "categoryId",
    "name type",
  );
  return transaction ? mapTransaction(transaction) : null;
};

/** Update a transaction */
export const updateTransaction = async (
  id: string,
  data: UpdateTransactionDTO,
): Promise<TransactionDTO | null> => {
  // Explicitly destructure to prevent categoryId overwrite
  const { title, amount, transactionDate } = data;

  const updated = await TransactionModel.findByIdAndUpdate(
    id,
    { title, amount, transactionDate },
    { new: true },
  ).populate("categoryId", "name type");

  return updated ? mapTransaction(updated) : null;
};

/** Delete a transaction */
export const deleteTransaction = async (id: string): Promise<boolean> => {
  const deleted = await TransactionModel.findByIdAndDelete(id);
  return !!deleted;
};

/** Get dashboard stats: total income, total expenses, balance */
export const getDashboardStats = async (userId: string) => {
  // Fetch all transactions for the user with category type
  const transactions = await fetchTransactionsForDashboard(userId);

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((tx: any) => {
    if (tx.categoryId.type === "income") totalIncome += tx.amount;
    else if (tx.categoryId.type === "expense") totalExpenses += tx.amount;
  });

  const balance = totalIncome - totalExpenses;

  return [
    { id: "1", title: "Total Income", amount: `${totalIncome}` },
    { id: "2", title: "Total Expenses", amount: `${totalExpenses}` },
    { id: "3", title: "Balance", amount: `${balance}` },
  ];
};

/** Mapper: Mongo document → DTO */
const mapTransaction = (doc: any): TransactionDTO => ({
  id: doc._id.toString(),
  userId: doc.userId.toString(),
  categoryId: doc.categoryId._id
    ? doc.categoryId._id.toString()
    : doc.categoryId.toString(),
  title: doc.title,
  amount: doc.amount,
  transactionDate: doc.transactionDate.toISOString(),
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});
