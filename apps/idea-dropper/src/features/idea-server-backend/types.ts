import { ObjectId, Collection } from "mongodb";

export type CardDocument = {
  id: ObjectId;
  [x: string]: any
};


export type BoxDocument = {
  id?: ObjectId;
  name: string;
  owner: ObjectId;
  [x: string]: any
};

export type UserDocument = {
  id?: ObjectId;
  username: string;
  email: string;
  password: string;
  created_date: string;
  last_login_date: string;
  type?: string;
  [x: string]: any;
};
