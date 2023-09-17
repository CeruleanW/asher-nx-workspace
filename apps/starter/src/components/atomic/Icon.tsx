import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free-solid';
import {
  FaTools,
  FaRegSquare,
  FaBluetooth,
  FaLayerGroup,
} from 'react-icons/fa';

export default function Icon({ name, ...rest }) {
  if (name === 'tools') {
    return <FaTools {...rest} />;
  } else if (name === 'FaRegSquare') {
    return <FaRegSquare {...rest} />;
  } else if (name === 'bluetooth') {
    return <FaBluetooth {...rest} />;
  } else if (name === 'floor') {
    return <FaLayerGroup {...rest} />;
  } else {
    return <FontAwesomeIcon icon={name} {...rest} />;
  }
}
