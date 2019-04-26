import React from 'react';
import { shallow } from 'enzyme';
import Card from '../index';

const element = <p>Example</p>;

const props = {
  children: element
};

let wrapper;
beforeEach(() => {
  wrapper = shallow(<Card {...props} />);
});

test('Should render correctly', () => {
  const card = wrapper.find('div');
  expect(card.getElement()).toEqual(<div className="Card">{element}</div>);
});
