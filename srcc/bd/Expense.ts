import Realm, {ObjectSchema} from 'realm';

export class Expense extends Realm.Object<Expense> {
  _id!: number;
  type!: 'lend' | 'borrow' | 'deposit' | 'expense';
  amount!: number;
  note?: string;
  party?: string;
  category?: string;
  date!: Date;

  static schema: ObjectSchema = {
    name: 'Expense',
    primaryKey: '_id',
    properties: {
      _id: 'int',
      type: 'string',
      amount: 'double',
      note: 'string?',
      party: 'string?',
      category: 'string?',
      date: 'date',
    },
  };
}
