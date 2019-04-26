import React from 'react';
import { mount } from 'enzyme';
import Modal from '../index';

const element = <p>Example</p>;

const props = {
  children: element
};

let wrapper;
beforeEach(() => {
  wrapper = mount(<Modal {...props} />);
});

test('Should render correctly', () => {
  const card = wrapper.find('.Modal');
  expect(card.getElement().toString()).toContain(`${element}`);
});
