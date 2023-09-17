//name, password,
const schema = {
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
