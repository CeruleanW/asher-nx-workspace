import {
  Menu as ReactMenu,
  MenuItem as ReactMenuItem,
  MenuButton as ReactMenuButton,
  ControlledMenu as ReactControlledMenu,
} from '@szhsin/react-menu';
// import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';

/**
 * basic menu https://szhsin.github.io/react-menu#basic-menu
 */
export function Menu(props) {
  return <MuiMenu {...props}/>
}

export function MenuItem(props) {
  return <MuiMenuItem {...props}/>
}

export function MenuButton(props) {
  return <ReactMenuButton {...props}/>
}

/**
 * https://szhsin.github.io/react-menu#controlled-menu
 */
export function ControlledMenu(props) {
  return <ReactControlledMenu {...props}/>
}
