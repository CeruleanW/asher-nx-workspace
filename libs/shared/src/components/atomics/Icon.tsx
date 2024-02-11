import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //
import '@fortawesome/fontawesome-free-solid';
// import { faBars, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {
  FaTools,
  FaRegSquare,
  FaBluetooth,
  FaLayerGroup,
  FaPlusCircle,
} from 'react-icons/fa'; // https://react-icons.github.io/react-icons/
import { GoNote } from "react-icons/go";
import { IoMenu } from "react-icons/io5";
import MuiCloseIcon from '@mui/icons-material/Close';
import MuiMenuIcon from '@mui/icons-material/Menu';

export function Icon({ name, ...rest }) {
  if (name === 'tools') {
    return <FaTools {...rest} />;
  } else if (name === 'FaRegSquare') {
    return <FaRegSquare {...rest} />;
  } else if (name === 'bluetooth') {
    return <FaBluetooth {...rest} />;
  } else if (name === 'floor') {
    return <FaLayerGroup {...rest} />;
  } else if (name === 'solid-circle-plus') {
    return <FaPlusCircle {...rest} />;
  } else if (name === 'note') {
    return <GoNote {...rest} />;
  } else {
    return <FontAwesomeIcon icon={name} {...rest} />;
  }
}

export const CloseIcon = MuiCloseIcon;

export const MenuIcon = IoMenu;
export const MenuIcon2 = MuiMenuIcon;
