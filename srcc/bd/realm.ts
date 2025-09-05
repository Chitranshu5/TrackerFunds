import Realm from "realm";

export const UserSchema = {
  name: "User",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    id: "int",
    name: "string",
    email: "string",
    phone: "string?",
  },
};

export const TransactionSchema = {
  name: "Transaction",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    id: "int",
    userId: "objectId",  // link to User._id
    userName: "string",
    type: "string",
    amount: "double",
    date: "date",
    description: "string?",
    category: "string?",
  },
};

let realmInstance: Realm | null = null;

export const getRealm = (): Realm => {
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = new Realm({
    schema: [UserSchema, TransactionSchema],
    schemaVersion: 1, // ⬅️ Always set schemaVersion
  });

  console.log("✅ Realm initialized");
  return realmInstance;
};
