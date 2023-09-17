const schema = {
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
      'last-updated-date': {bsonType: 'timestamp'},
      'last-access-date': {bsonType: 'timestamp'},
      size: {
        bsonType: 'int',
      },
      cards: {
        bsonType: ['array'],
        items: 'objectId',
      },
      owner: {bsonType: 'objectId'},
      sharedWith: {
        bsonType: ['array'],
        items: 'objectId',
      },
      drawSequence: {
        bsonType: 'int',
      }
    },
  },
};
