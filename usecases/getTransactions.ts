// usecases/getDashboardTransactions.ts
import { Transaction } from "@/entities/transaction";

export const getDashboardTransactions = async (): Promise<Transaction[]> => {
  return [
    { id: 1, title: "Total Income", amount: "+₱8,450" },
    { id: 2, title: "Total Expenses", amount: "-₱3,120" },
    { id: 3, title: "Balance", amount: "+₱5,330" },
    { id: 4, title: "Groceries", amount: "-₱1,200" },
    { id: 5, title: "Freelance Project", amount: "+₱8,500" },
  ];
};
 