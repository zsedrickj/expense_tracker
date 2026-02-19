/* eslint-disable @typescript-eslint/no-explicit-any */
// src/repositories/transaction.repository.ts
import "server-only";

import DbConnection from "@/lib/mongodb";
import TransactionModel from "@/models/transaction";
import { Transaction as TransactionDTO } from "@/types/transaction.types";
import mongoose from "mongoose";

/** Mapper: Mongo doc → DTO */
const mapTransaction = (doc: any): TransactionDTO => ({
  _id: doc._id.toString(),
  userId: doc.userId.toString(),
  categoryId: doc.categoryId
    ? {
        _id: doc.categoryId._id.toString(),
        name: doc.categoryId.name,
        type: doc.categoryId.type,
      }
    : null,
  title: doc.title,
  amount: doc.amount,
  transactionDate: doc.transactionDate.toISOString(),
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});

export async function createTransaction(data: any): Promise<TransactionDTO> {
  await DbConnection();
  const doc = await TransactionModel.create(data);
  return mapTransaction(doc);
}

export async function getUserTransactions(
  userId: string,
): Promise<TransactionDTO[]> {
  await DbConnection();
  const docs = await TransactionModel.find({ userId })
    .sort({ transactionDate: -1 })
    .populate("categoryId", "name type");
  return docs.map(mapTransaction);
}

export async function getTransactionById(
  id: string,
): Promise<TransactionDTO | null> {
  await DbConnection();
  const doc = await TransactionModel.findById(id).populate(
    "categoryId",
    "name type",
  );
  return doc ? mapTransaction(doc) : null;
}

export async function updateTransaction(
  id: string,
  data: any,
): Promise<TransactionDTO | null> {
  await DbConnection();
  const doc = await TransactionModel.findByIdAndUpdate(id, data, {
    new: true,
  }).populate("categoryId", "name type");
  return doc ? mapTransaction(doc) : null;
}

export async function deleteTransaction(id: string): Promise<boolean> {
  await DbConnection();
  const doc = await TransactionModel.findByIdAndDelete(id);
  return !!doc;
}

/** Fetch all transactions for dashboard aggregation */
export async function fetchTransactionsForDashboard(userId: string) {
  await DbConnection();
  // Populate only category type for aggregation
  return TransactionModel.find({ userId }).populate("categoryId", "type");
}

export async function getExpenseByCategoryRepo(userId: string) {
  await DbConnection();

  const result = await TransactionModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: "$category" },
    {
      $match: {
        "category.type": "expense",
      },
    },
    {
      $group: {
        _id: "$category.name",
        total: { $sum: "$amount" },
      },
    },
    { $sort: { total: -1 } },
  ]);

  return result;
}
