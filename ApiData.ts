import { ObjectId } from "bson";

export type User = {
  id: number;           // local numeric ID (for UI, sample data, dropdowns, etc.)
   _id: Realm.BSON.ObjectId;    // Realm ObjectId (primary key in DB)
  name: string;
  email: string;
  phone?: string | null;
};

// Transaction Interface
export interface Transaction {
  _id: Realm.BSON.ObjectId;
  id: number;
  userId: Realm.BSON.ObjectId;
  userName: string;
  type: "lend" | "borrow" | "deposit";
  amount: number;
  date: Date;
  description?: string;
  category?: string | null;
}






// Calculation functions
export const calculateTotalLent = (transactions: Transaction[]): number =>
  transactions.filter((t) => t.type === "lend").reduce((sum, t) => sum + t.amount, 0);

export const calculateTotalBorrowed = (transactions: Transaction[]): number =>
  transactions.filter((t) => t.type === "borrow").reduce((sum, t) => sum + t.amount, 0);

export const calculateTotalDeposited = (transactions: Transaction[]): number =>
  transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0);

export const calculateNetBalance = (transactions: Transaction[]): number => {
  const totalLent = calculateTotalLent(transactions);
  const totalBorrowed = calculateTotalBorrowed(transactions);
  const totalDeposited = calculateTotalDeposited(transactions);

  return totalDeposited + totalLent - totalBorrowed;
};

// Utility functions
export const getUserById = (users: User[], userId: number): User | undefined =>
  users.find((user) => user.id === userId);

export const getTransactionsByUserId = (
  transactions: Transaction[],
  userId: string
): Transaction[] => transactions.filter((transaction) => transaction.userId === userId);

export const getTransactionsByType = (
  transactions: Transaction[],
  type: Transaction["type"]
): Transaction[] => transactions.filter((transaction) => transaction.type === type);

export const formatCurrency = (amount: number): string =>
  `$${amount.toLocaleString()}`;
