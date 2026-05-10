import type { ObjectId } from 'mongodb';

export interface ICard {
  'created-date': Date;
  'last-updated-date': Date;
  'last-access-date': Date;
  owner: ObjectId;
  content: string;
  title?: string;
  boxes?: string;
}

export const cardSchema = {
  $jsonSchema: {
    required: [
      'created-date',
      'last-updated-date',
      'last-access-date',
      'owner',
      'content',
    ],
    properties: {
      'created-date': { bsonType: 'date' },
      'last-updated-date': { bsonType: 'date' },
      'last-access-date': { bsonType: 'date' },
      owner: { bsonType: 'objectId' },
      title: { bsonType: 'string' },
      boxes: { bsonType: 'string' },
    },
  },
};
