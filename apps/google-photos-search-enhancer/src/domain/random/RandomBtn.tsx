import { Button } from '../../components/atomic/Button';
import { getRandomKeys } from '../../features/random/foo';
import { getValue, useIndexedDB } from '../../features/client-storage';
import { LocalMediaItem } from '../../features/g-api/types';
import { useDispatch } from 'react-redux';
import { setDisplayedPhotos } from '../../providers/redux/photosSlice';
import { requestMediaItemsByIds } from '../../features/media-items';

/**
 *
 */
export function RandomBtn(props) {
  // Hooks
  const dispatch = useDispatch();
  const { data: localMediaKeys, error: localMediaKeysError } = useIndexedDB();

  const handleClick = async () => {
    const keys = await getRandomKeys();
    console.log('random keys', keys);
    //@ts-ignore
    const values: LocalMediaItem[] = await Promise.all(keys.map(key => getValue(key)));
    const ids = values.map(value => value?.id);
    const urls = await requestMediaItemsByIds(ids);
    // console.log('dispatched urls', urls);
    dispatch(setDisplayedPhotos(urls));
  };

  console.debug('localMediaKeys', localMediaKeys);
  const isDataReady = Boolean(localMediaKeys && localMediaKeys.length);

  return (
    <>
      <Button onClick={handleClick} disabled={!isDataReady} {...props}>Random</Button>
    </>
  )
}
