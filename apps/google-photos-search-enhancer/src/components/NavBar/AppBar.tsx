import MUIAppBar from '@material-ui/core/AppBar';
import { useEffect, useState } from 'react';
import { checkNotFirstVisit, getTimeStamp } from '../../features/client-storage';
import { RandomBtn } from '../../features/random/components/RandomBtn';
import { GoogleBtn } from '../GoogleBtn';
import HelpModal from '../HelpModal';
import SearchBar from '../SearchBar';
import { Title } from '../Title';


export function AppBar({ onOpenDrawer, ...optionals }) {
  // States
  const [lastUpdateTime, setLastUpdateTime] = useState('');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    // If it's the first time
    if (!checkNotFirstVisit()) {
      setIsHelpModalOpen(true);
    }
  }, []);

  const handleHelpModalClose = () => {
    setIsHelpModalOpen(false);
  };

  const handleSetLastUpdateTime = () => setLastUpdateTime(getTimeStamp());

  return (
    <div>
      <MUIAppBar position="sticky">
        <div className="flex items-stretch justify-between flex-wrap max-w-full space-y-2 md:space-y-0 sm:gap-x-2 px-4 my-2">
          <div className="flex items-center flex-grow">
            <Title onClick={() => onOpenDrawer(true)} />
          </div>
          <div className="flex justify-start items-stretch max-w-full flex-wrap flex-grow">
            <SearchBar />
          </div>
          <div className={'flex gap-x-2 items-center'} >
            <RandomBtn />
            <GoogleBtn
              onSetLastUpdateTime={handleSetLastUpdateTime}
              lastUpdateTime={lastUpdateTime}
            />
          </div>
        </div>
      </MUIAppBar>
      <HelpModal open={isHelpModalOpen} onClose={handleHelpModalClose} />
    </div>
  );
}
