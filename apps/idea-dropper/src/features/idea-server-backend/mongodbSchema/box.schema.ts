import type { ObjectId, Timestamp } from 'mongodb';

export interface IBox {
  name: string;
  tags?: string[];
  'created-date': Timestamp;
  'last-updated-date': Timestamp;
  'last-access-date': Timestamp;
  size: number;
  cards?: ObjectId[];
  owner: ObjectId;
  sharedWith?: ObjectId[];
  drawSequence?: number;
}

export const boxSchema = {
  $jsonSchema: {
    required: ['name', 'created-date', 'last-updated-date', 'last-access-date', 'size', 'owner'],
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string and is required',
      },
      tags: {
        bsonType: ['array'],
        items: 'string',
      },
      'created-date': {
        bsonType: 'timestamp',
      },
      'last-updated-date': { bsonType: 'timestamp' },
      'last-access-date': { bsonType: 'timestamp' },
      size: {
        bsonType: 'int',
      },
      cards: {
        bsonType: ['array'],
        items: 'objectId',
      },
      owner: { bsonType: 'objectId' },
      sharedWith: {
        bsonType: ['array'],
        items: 'objectId',
      },
      drawSequence: {
        bsonType: 'int',
      },
    },
  },
};
