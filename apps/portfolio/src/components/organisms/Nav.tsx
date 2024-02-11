//@ts-nocheck
import React from 'react';
import { AppBar, Toolbar } from '@root/shared/components/atomics/AppBar';
import {useMediaQuery, useTheme} from '@root/shared/styles';
import { Link } from 'react-router-dom';
import { Menu } from './Menu';
import '../../styles/components/link.scss';

export default function Nav({ routes, children, pageTitles }) {
  const allTabs = routes;
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
        {smDown ? null : children}
        {mdUp ? null : <Menu routes={allTabs} pageTitles={pageTitles} />}
      </Toolbar>
    </AppBar>
  );
}
