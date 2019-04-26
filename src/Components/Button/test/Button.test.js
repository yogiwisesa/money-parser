import React from 'react';
import { shallow } from 'enzyme';
import Button from '../index';

const props = {
  onClick: jest.fn(),
  children: 'Calculate'
}

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Button {...props}/>);
});

test('Should render correctly', () => {
  const button = wrapper.find('button');
  expect(button.length).toEqual(1);
  expect(button.text()).toEqual('Calculate');
});

test('Should invoke correct function when clicked', () => {
  const spy = jest.spyOn(wrapper.props(), 'onClick');
  const button = wrapper.find('button');

  button.simulate('click');
  expect(spy).toHaveBeenCalled();  
});