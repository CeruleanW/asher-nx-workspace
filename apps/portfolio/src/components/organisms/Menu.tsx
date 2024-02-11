import React, { useState } from 'react';
import { MenuItem, MenuList } from '@root/shared/components/molecule';
import { MenuIcon2, IconButton, Paper, Popper } from '@root/shared/components/atomics';
import { ClickAwayListener } from '@root/shared/components/headless';
import { Grow } from '@root/shared/features/animation';

import { Link } from 'react-router-dom';

export function Menu(props) {
  // const [anchorEl, setAnchorEl] = useState(null);
  const { routes, pageTitles } = props;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setIsMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setIsMenuOpen(false);
    }
  }

  return (
    <div>
      <IconButton
        edge='start'
        className={''}
        color='inherit'
        aria-label='menu'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        ref={anchorRef}
        aria-controls={isMenuOpen ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
      >
        <MenuIcon2 />
      </IconButton>

      <Popper
        open={isMenuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement={'top-end'}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={isMenuOpen}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}
                >
                  {routes.map((route, index) => (
                    <MenuItem
                      onClick={handleClose}
                      component={Link}
                      to={route}
                      key={'menu-item-' + route}
                    >
                      {pageTitles[index]}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
