//@ts-nocheck
import React from 'react';
import { AppBar, Toolbar } from '@root/shared/components/atomics/AppBar';
import {useMedia} from 'react-use';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';
import '../../styles/components/link.scss';

export default function Nav({ routes, children, pageTitles }) {
  const allTabs = routes;
  const isSmDown = useMedia('(max-width: 600px)');
  const isMdUp = useMedia('(min-width: 960px)');

  return (
    <AppBar position='static' sx={[{
      '&.MuiPaper-root': {
        backgroundColor: '#2C2C2C',
      },
    }]} >
      <Toolbar disableGutters>
        <p className={`nav-title px-4 no-decoration`}>
          <Link to={allTabs[0]}>&#10023; Asher.Y</Link>
        </p>
        <div className='flex-1'></div>
        {isSmDown ? null : children}
        {isMdUp ? null : <Menu routes={allTabs} pageTitles={pageTitles} />}
      </Toolbar>
    </AppBar>
  );
}
