import { MEDIA_ITEMS_API } from './../g-api/constants';
import { LocalUrls } from './types';
import { fetchData } from '../../features/request';

/**
 *
 * @param ids
 * @param accessToken
 * @returns
 */
export async function requestMediaItemsByIds(
  ids: string[],
  accessToken?: string
): Promise<LocalUrls[]> {
  // set a list of requests
  const urls = ids.filter((id) => Boolean(id)).map((id) => `${MEDIA_ITEMS_API}/${id}`);

  const processedUrls = accessToken
    ? urls.map((url) => `${url}?access_token=${accessToken}`)
    : urls;

  const fetches = processedUrls.map(
    (request) => fetchData(request)
  );

  return await Promise.all(fetches).then((fulfilleds) => {
    const resultUrls = fulfilleds.map((fulfilled) => {
      const { baseUrl, productUrl } = fulfilled || {};
      return { baseUrl, productUrl };
    });
    return resultUrls;
  });
}
