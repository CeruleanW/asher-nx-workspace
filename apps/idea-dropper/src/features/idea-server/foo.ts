import { getData, post, del, put, patch } from '@root/shared/features/axios';
import { handle } from '@root/shared/utils';
import { CARD, BOX, SHAKE_BOX } from './apis';
import { CreateCardDTO, CreateBoxDTO, UpdateCardDTO } from './types';

//Data operations a user can perform on the App

export async function fetchBoxes() {}

export async function fetchNextCard(boxId) {}

export async function shakeBox(boxId) {
  const url = `${SHAKE_BOX}${boxId}`;
  return await put(url);
}

/**
 * send request to insert a card
 */
export async function insertCard(data: CreateCardDTO): Promise<any> {
  // process data
  console.debug('insertCard', data);
  // call API
  const [result, resultErr] = await handle(post(CARD, data));
  if (resultErr) throw new Error('Could not insert the card to the server');
  return result;
}

/**
 *
 */
export async function updateCard(data: Partial<UpdateCardDTO>) {
  const {_id} = data || {};
  const url = `${CARD}/id/${_id}`;
  return await patch(url, data);
}

export async function insertMultipleCards(cardArray) {}
export async function addBox(data: CreateBoxDTO) {
  return await post(BOX, data);
}

export async function deleteCard(cardId: string) {
  const url = `${CARD}/id/${cardId}`;
  return await del(url);
}

export async function deleteBox(boxId: string) {
  const url = `${BOX}/id/${boxId}`;
  return await del(url);
}
export async function drawCard(boxID: string) {
  const url = `${BOX}/id/draw/${boxID}`;
  return await getData(url);
}
export async function drawCards(boxId, num) {}

export async function registerUser() {

}
