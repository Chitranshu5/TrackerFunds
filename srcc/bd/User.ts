import Realm from "realm";

export class User extends Realm.Object<User> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  phone?: string;

  static schema: Realm.ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      email: "string",
      phone: "string?",
    },
  };
}
