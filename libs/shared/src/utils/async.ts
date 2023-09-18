/**
 * @description ### Returns Go / Lua like responses(data, err)
 * when used with await
 *
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.all([req1, req2, req3])
 * - Example response [ [data1, data2, data3], undefined ]
 * - Example response [ undefined, Error ]
 *
 *
 * When used with Promise.race([req1, req2, req3])
 * - Example response [ data, undefined ]
 * - Example response [ undefined, Error ]
 *
 * @param {Promise} promise
 * @returns {Promise} [ data, undefined ]
 * @returns {Promise} [ undefined, Error ]
 */
export const handle = (promise: Promise<any>) => {
  return promise
    .then((data) => [data, undefined])
    .catch((error) => Promise.resolve([undefined, error]));
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


export async function callAsyncFnWithErrorTolerance(fn, maxErrorDepth = 10) {
  let errorDepth = 0;
  let result, resultErr;
  while (errorDepth < maxErrorDepth) {
    [result, resultErr] = await handle(fn());
    // await sleep(200);
    if (result) {
      break;
    } else {
      console.error('No result');
      console.error(resultErr?.message);
      errorDepth++;
      resultErr = null;
    }
  }
  if (errorDepth >= 10) {
    throw new Error('Max error depth reached when writing firmware chunks');
  }

  return result;
}
