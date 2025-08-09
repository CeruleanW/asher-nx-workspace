import { Collection, Db, MongoClient, MongoClientOptions } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process?.env || {
  MONGODB_URI: undefined,
  MONGODB_DB: undefined,
};

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

type MongoDBInstance = {
    client: MongoClient
    db: Db
};

type MongoConnection = {
  conn: MongoDBInstance;
  promise: MongoDBInstance;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: MongoConnection = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

const opts: MongoClientOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

/**
 * requires environment variable MONGODB_URI and MONGODB_DB
 */
export async function connectToDatabase(): Promise<MongoDBInstance> {
  console.log('Connecting to Database...', MONGODB_URI);
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const client: MongoClient = await MongoClient.connect(MONGODB_URI, opts);
    cached.promise = {
      client,
      db: client.db(MONGODB_DB),
    };
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export function iterateFunc(doc) {
  console.log(JSON.stringify(doc, null, 4));
}

export function errorFunc(error) {
  console.log(error);
}

export async function getCollection(name: string): Promise<Collection<any>> {
  const { db } = await connectToDatabase();
  const result = db.collection(name);
  return result;
}

export async function getMongoClient() {
  const { client } = await connectToDatabase();
  return client;
}
