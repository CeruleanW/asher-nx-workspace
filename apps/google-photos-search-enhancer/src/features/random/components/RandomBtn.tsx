import { Button } from '../../../components/atomic/Button';
import { getRandomKeys } from '../foo';
import { getValue, getAllKeysOfLocalMediaItems, useIndexedDB } from '../../../features/client-storage';
import { LocalMediaItem } from '../../g-api/types';
import { useDispatch } from 'react-redux';
import { setDisplayedPhotos } from '../../../providers/redux/photosSlice';
import { requestMediaItemsByIds } from '../../../features/media-items';
// import {} from '@root/shared/features/auth';

export function RandomBtn(props) {
  // Hooks
  const dispatch = useDispatch();
  const {data: localMediaKeys, error: localMediaKeysError} = useIndexedDB();

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

  // console.debug('localMediaKeys', localMediaKeys);
  const isDataReady = Boolean(localMediaKeys && localMediaKeys.length);

  return (
    <>
      <Button onClick={handleClick} disabled={!isDataReady}>Random</Button>
    </>
  )
}
