import type { ObjectId, Timestamp } from 'mongodb';

export interface IUser {
  username: string;
  password: string;
  boxes: ObjectId[];
  owner: ObjectId;
  content: string;
  'created-date'?: Timestamp;
  'last-login-date'?: Timestamp;
  type?: string;
}

// name, password,
export const userSchema = {
  $jsonSchema: {
    required: ['username', 'password', 'boxes', 'owner', 'content'],
    properties: {
      username: { bsonType: 'string' },
      password: { bsonType: 'string' },
      boxes: { bsonType: ['array'], items: { bsonType: 'objectId' } },
      'created-date': {
        bsonType: 'timestamp',
      },
      'last-login-date': { bsonType: 'timestamp' },
      type: { bsonType: 'string' },
    },
  },
};
