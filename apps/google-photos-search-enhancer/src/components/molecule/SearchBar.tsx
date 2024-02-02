import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@root/shared/components/atomics/Button';
import { searchForItems } from '../../features/client-storage';
import { useAccess } from '../Context/AccessContext';
import { useFeedbackUpdate } from '../Context/FeedbackContext';
import { useDispatch } from 'react-redux';
import { requestMediaItemsByIds } from '../../features/media-items';
import { setDisplayedPhotos } from '../../providers/redux/photosSlice';
import styled from 'styled-components';
import { useIndexedDB } from '../../features/client-storage';

const InputContainer = styled.div`
  margin-bottom: 0.5rem;
  @media (min-width: 382px) {
    margin-bottom: 0;
  }
`;

const useStyles = makeStyles((theme) => ({
  search: {
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: alpha(theme.palette.common.white, 0.25),
    // },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    // width: '100%',
    // marginBottom: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      // marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(0),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    marginRight: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    // width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

/**
 *
 */
export function SearchBar() {
  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const { accessToken, isLogined } = useAccess() || {};
  const updateIsSearching = useFeedbackUpdate().handleIsSearching;
  const updateIsNoMatch = useFeedbackUpdate().handleIsNoMatch;
  const { data: localMediaKeys, error: localMediaKeysError } = useIndexedDB();

  // Local state
  const [keyword, setKeyword] = useState('');

  // Search, use the keyword in state, go through the local IndexedDB, pass the base urls to Photos
  const handleSearch = async () => {
    const t0 = performance.now();
    console.debug(`Search start: ${t0} milliseconds`);

    // No input in the searchbar
    if (!keyword) {
      return false;
    }

    // show the progress feedback
    updateIsSearching(true);

    // send keyword to search media items from IndexedDB
    // get the image URLs
    const fulfilled = await searchForItems(keyword);
    const ids = fulfilled.map((data) => data?.item?.id);
    if (!ids?.length) {
      // display a error feedback
      updateIsNoMatch(true);
      return 'No result';
    }
    updateIsSearching(false);

    // request for the base urls and the product urls
    const urls = await requestMediaItemsByIds(ids, accessToken);
    // console.log('urls', urls);
    // send the base urls in response to App
    dispatch(setDisplayedPhotos(urls));
  };

  const handleClick = () => {
    handleSearch()
      .catch((rejected) => console.log('Error: ' + rejected))
      .finally(() => updateIsSearching(false));
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      handleSearch();
    }
  };

  const isDisabled = !Boolean(localMediaKeys && localMediaKeys.length);

  return (
    <>
      <InputContainer className={`min-w-fit max-w-full relative space-y-2 bg-slate-100/20 hover:bg-slate-100/30 rounded mr-2`}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          className={''}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleKeywordChange}
          onKeyUp={handleSearchKeyUp}
          autoFocus={true}
        />
      </InputContainer>
      <div className={'flex items-center'}>
        <Button variant='contained' onClick={handleClick} disabled={isDisabled}>
          Search
        </Button>
      </div>
    </>
  );
}
