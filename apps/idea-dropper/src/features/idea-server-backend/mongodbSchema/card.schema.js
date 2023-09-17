const schema = {
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
      boxes: { bsonType: 'string' }
    },
  },
};
