/* eslint-disable @typescript-eslint/no-explicit-any */
// services/transaction.service.ts
import TransactionModel from "@/models/transaction"; // Mongoose model
import Category from "@/models/category";
import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  Transaction as TransactionDTO,
} from "@/types/transaction.types"; // TypeScript type
import {
  fetchTransactionsForDashboard,
  getCategoryByTransactionRepo,
  getExpenseByCategoryRepo,
} from "@/repository/transaction.repository";

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
export const getUserTransactions = async (userId: string) => {
  const transactions = await TransactionModel.find({ userId })
    .sort({ transactionDate: -1 })
    .populate("categoryId", "name type");

  return transactions.map((tx) => ({
    id: tx._id.toString(),
    title: tx.title,
    amount: tx.amount,
    categoryId: tx.categoryId,
    createdAt: tx.createdAt,
  }));
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
  const transactions = await fetchTransactionsForDashboard(userId);

  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach((tx: any) => {
    if (tx.categoryId?.type === "income") totalIncome += tx.amount;
    else if (tx.categoryId?.type === "expense") totalExpenses += tx.amount;
  });

  const balance = totalIncome - totalExpenses;
  const total = totalIncome + totalExpenses;

  // Calculate percentages
  const totalIncomePercent = total
    ? Math.round((totalIncome / total) * 100)
    : 0;
  const totalExpensesPercent = total
    ? Math.round((totalExpenses / total) * 100)
    : 0;

  return [
    {
      id: "1",
      title: "Total Income",
      amount: `${totalIncome}`,
      percent: totalIncomePercent, // ✅ new
    },
    {
      id: "2",
      title: "Total Expenses",
      amount: `${totalExpenses}`,
      percent: totalExpensesPercent, // ✅ new
    },
    {
      id: "3",
      title: "Balance",
      amount: `${balance}`,
      percent: 0, // optional, you can leave balance percent as 0
    },
  ];
};

export const getMonthlyTotals = async (userId: string) => {
  const transactions = await fetchTransactionsForDashboard(userId);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyMap: Record<number, { income: number; expense: number }> = {};

  // Initialize months
  for (let i = 0; i < 12; i++) {
    monthlyMap[i] = { income: 0, expense: 0 };
  }

  // Compute totals
  transactions.forEach((tx: any) => {
    const month = new Date(tx.transactionDate).getMonth();

    if (tx.categoryId?.type === "income") {
      monthlyMap[month].income += tx.amount;
    } else if (tx.categoryId?.type === "expense") {
      monthlyMap[month].expense += tx.amount;
    }
  });

  // Convert to ordered array
  return months.map((monthName, index) => ({
    month: monthName,
    income: monthlyMap[index].income,
    expense: monthlyMap[index].expense,
  }));
};

export const getExpenseByCategory = async (userId: string) => {
  const result = await getExpenseByCategoryRepo(userId);

  const totalExpense = result.reduce((sum, item) => sum + item.total, 0);

  if (!totalExpense) {
    return result.map((item) => ({
      name: item._id,
      value: item.total,
      percent: 0,
    }));
  }

  // Normalize percentages so total = 100%
  let accumulatedPercent = 0;
  const pieData = result.map((item, index) => {
    let percent: number;

    if (index === result.length - 1) {
      // Last item gets remaining percent to ensure total = 100%
      percent = 100 - accumulatedPercent;
    } else {
      percent = Math.round((item.total / totalExpense) * 100);
      accumulatedPercent += percent;
    }

    return {
      name: item._id,
      value: item.total,
      percent,
    };
  });

  return pieData;
};

export const getCategoryByTransaction = async (userId: string) => {
  const result = await getCategoryByTransactionRepo(userId);

  const totalAmount = result.reduce(
    (sum: number, item: any) => sum + item.totalAmount,
    0,
  );

  if (!totalAmount) {
    return result.map((item: any) => ({
      name: item.name,
      type: item.type,
      value: item.totalAmount,
      percent: 0,
    }));
  }

  let accumulatedPercent = 0;

  const chartData = result.map((item: any, index: number) => {
    let percent: number;

    if (index === result.length - 1) {
      percent = 100 - accumulatedPercent;
    } else {
      percent = Math.round((item.totalAmount / totalAmount) * 100);
      accumulatedPercent += percent;
    }

    return {
      name: item.name,
      type: item.type,
      value: item.totalAmount,
      percent,
    };
  });

  return chartData;
};



/** Mapper: Mongo document → DTO */
const mapTransaction = (doc: any): TransactionDTO => ({
  _id: doc._id.toString(),
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
