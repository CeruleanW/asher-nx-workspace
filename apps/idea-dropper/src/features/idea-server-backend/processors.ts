import { isFilledArray } from "@root/shared/utils";
import { ObjectId } from "mongodb";
import {getRandomArrayFromSeed} from '@root/shared/features/random';

/**
 *
 */
export function getNextDrawCardID(draw_seed: number[], draw_pointer: number, cards: ObjectId[]) {
  console.debug('getNextDrawCardID inputs', draw_seed, draw_pointer, cards);
  if (!isFilledArray(cards)) {
    return null;
  }

  if (draw_pointer >= cards.length) {
    return null;
  }
  const sample = getRandomArrayFromSeed(cards, draw_seed);
  const nextCardID = sample[draw_pointer];
  return nextCardID;
}


/**
 * create a Card entity based on dto
 */
export function createUserDoc(
  session
) {
  // const ownerObj = new ObjectId(owner);
  // const boxes = boxIDs?.map((boxID) => new ObjectId(boxID)) || [];

  // return {
  //   title,
  //   'created-date': createdDate,
  //   'last-updated-date': createdDate,
  //   'last-access-date': createdDate,
  //   ownerObj,
  //   content,
  //   boxes: boxes,
  // };
}
