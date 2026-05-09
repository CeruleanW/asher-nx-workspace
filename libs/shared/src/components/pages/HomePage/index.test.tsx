// @ts-nocheck -- @types/enzyme is not installed; enzyme calls cannot be statically typed per migration spec.
// https://github.com/diegohaz/arc/wiki/Testing-components
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '.';

it('renders', () => {
  shallow(<HomePage />);
});
