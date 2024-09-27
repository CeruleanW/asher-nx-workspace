import { IconButton } from '@root/shared/components/atomics/IconButton';
import MUIDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DrawerList } from './DrawerList';
import { LastUpdateTime } from './LastUpdateTime';
import styled from 'styled-components';
import { getTimeStamp } from '../../features/client-storage';
import { Divider } from '@root/shared/components/atomics/Divider';

const StyledContainer = styled.div`
  min-width: 16rem;
`;

const LastUpdateContainer = styled.div`
  padding: 1rem;
`;

/**
 *
 * @param param0
 * @returns
 */
export function Drawer({ show, onHide, }) {

  return (
    <MUIDrawer
      variant='persistent'
      anchor='left'
      open={show}
    >
      <StyledContainer>
        <div>
          <IconButton onClick={onHide}>
              <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <DrawerList />
        <Divider />
        <LastUpdateContainer><LastUpdateTime lastUpdateTime={getTimeStamp()} /></LastUpdateContainer>
      </StyledContainer>
    </MUIDrawer>
  )
}
