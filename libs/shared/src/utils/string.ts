/**
 * String Manipulations
 */


/**
 * conver the first letter to uppercase
 */
export function capitalizeFirstLetter(string: string) {
  return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

export function padZeroTo2Digits(num: number) {
  return String(num).padStart(2, '0');
}

export function makeID(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
