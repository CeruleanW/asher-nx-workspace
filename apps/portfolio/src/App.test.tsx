import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

describe('App Component', () => {
  // @types/enzyme not installed; wrapper typed as any per migration spec any-policy
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders', () => {
    expect(wrapper).not.toBeNull();
  });
});
