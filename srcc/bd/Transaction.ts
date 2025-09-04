import Realm from "realm";

// Define the Transaction schema
class Transaction extends Realm.Object<Transaction> {
  id!: number;
  userId!: number;
  userName!: string;
  type!: "lend" | "borrow" | "deposit";
  amount!: number;
  date!: string;
  description!: string;

  static schema: Realm.ObjectSchema = {
    name: "Transaction",
    primaryKey: "id",
    properties: {
      id: "int",
      userId: "int",
      userName: "string",
      type: "string", // You can restrict values manually
      amount: "int",
      date: "string",
      description: "string",
    },
  };
}

export default Transaction;
