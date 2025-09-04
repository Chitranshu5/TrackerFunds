// Define your types (optional if already defined elsewhere)
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

//old 
// export interface Transaction {
//   id: number;
//   userId: number;
//   userName: string;
//   type: 'lend' | 'borrow' | 'deposit';
//   amount: number;
//   date: string;
//   description: string;
// }

interface Transaction {
  id: number;
  userId: number;
  userName: string;
  type: 'lend' | 'borrow' | 'deposit';
  amount: number;
  date: string;
  description: string;
  category?: string;
}
// Sample initial users
export const initialUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '555-123-4567' },
];

// Sample initial transactions
export const initialTransactions: Transaction[] = [
  { id: 1, userId: 1, userName: 'John Doe', type: 'lend', amount: 500, date: '2023-10-15', description: 'Loan for car repair' },
  { id: 2, userId: 2, userName: 'Sarah Smith', type: 'borrow', amount: 300, date: '2023-10-10', description: 'Borrowed for rent' },
  { id: 3, userId: 3, userName: 'Mike Johnson', type: 'deposit', amount: 1200, date: '2023-10-05', description: 'Monthly savings' },
  { id: 4, userId: 1, userName: 'John Doe', type: 'lend', amount: 750, date: '2023-10-01', description: 'Business loan' },
  { id: 5, userId: 4, userName: 'Emma Wilson', type: 'borrow', amount: 450, date: '2023-09-28', description: 'Borrowed for medical expenses' },
  { id: 6, userId: 5, userName: 'David Lee', type: 'deposit', amount: 2000, date: '2023-09-20', description: 'Salary deposit' },
  { id: 7, userId: 2, userName: 'Sarah Smith', type: 'lend', amount: 350, date: '2023-09-15', description: 'Lent for groceries' },
  { id: 8, userId: 3, userName: 'Mike Johnson', type: 'borrow', amount: 600, date: '2023-09-12', description: 'Borrowed for school fees' },
  { id: 9, userId: 6, userName: 'Sophia Brown', type: 'deposit', amount: 1800, date: '2023-09-05', description: 'Freelance project payment' },
  { id: 10, userId: 5, userName: 'David Lee', type: 'lend', amount: 900, date: '2023-08-30', description: 'Helped a friend with travel money' },
];
