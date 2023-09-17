import { inspect, isFilledArray } from '@root/shared/utils';
import { ObjectId } from 'mongodb';
import { getCardCollection, getBoxCollection } from './collections';
import { createSeed } from '@root/shared/features/random';
import { BoxDocument } from './types';
import { CreateBoxDTO } from '../idea-server';

/**
 * create a Card entity based on dto
 */
export function createCardDoc(
  title: string,
  owner: string,
  content: any[],
  createdDate,
  boxIDs?: string[]
) {
  const ownerObj = new ObjectId(owner);
  const boxes = boxIDs?.map((boxID) => new ObjectId(boxID)) || [];

  return {
    title,
    'created-date': createdDate,
    'last-updated-date': createdDate,
    'last-access-date': createdDate,
    ownerObj,
    content,
    boxes: boxes,
  };
}

/**
 * new card should be in
 */
export async function insertNewCard(cardData) {
  console.debug('insertNewCard input', cardData);
  const cardCollection = await getCardCollection();

  // prepare card entity
  const { title, content, owner, boxes } = cardData || {};
  const createdDate = new Date();
  const doc = createCardDoc(title, owner, content, createdDate, boxes);

  // insert new card
  const result = await cardCollection.insertOne(doc);
  console.debug('insert new card result', result);

  // process result
  const { acknowledged, insertedId } = result;
  // console.log(ok);
  if (!acknowledged) {
    throw new Error('Insertion failed');
  }

  // update boxes
  if (isFilledArray(boxes)) {
    const boxCollection = await getBoxCollection();
    const boxIdObjs = boxes.map((boxId) => new ObjectId(boxId));
    const updateResult = await boxCollection.updateMany(
      { _id: { $in: boxIdObjs } },
      { $push: { cards: result.insertedId } }
    );
    console.debug('update boxes result', updateResult);
  }

  return { insertedId };
}

/**
 *
 */
export function createBoxDoc(data: CreateBoxDTO): BoxDocument {
  const { name, owner } = data || {};

  const ownerObj = new ObjectId(owner);
  const draw_seed = createSeed();
  const createdDate = new Date();

  const result = {
    name,
    'created-date': createdDate,
    'last-updated-date': createdDate,
    'last-access-date': createdDate,
    owner: ownerObj,
    draw_seed,
    cards: [],
    draw_pointer: 0,
  };

  return result;
}

// delete a card
export async function deleteCard(cardId: string) {
  const cardCollection = await getCardCollection();
  const result = await cardCollection.deleteOne({ _id: new ObjectId(cardId) });
  return result;
}

// remove a card from the cards prop in all boxes
export async function removeCardFromBoxes(cardId: string) {
  const boxCollection = await getBoxCollection();
  const result = await boxCollection.updateMany(
    {},
    { $pull: { cards: new ObjectId(cardId) } }
  );
  return result;
}

export async function deleteAllCards() {
  const cardCollection = await getCardCollection();
  const result = await cardCollection.deleteMany({});
  return result;
}

export async function updateCard(data) {
  const { _id, ...updated } = data || {};
  console.debug('patch card content', inspect(updated?.content));
  const cardCollection = await getCardCollection();
  const result = await cardCollection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: updated }
  );
  return result;
}
