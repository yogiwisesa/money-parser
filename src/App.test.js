import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

let wrapper;
beforeEach(() => {
  wrapper = shallow(<App />);
});

it('Renders all components correctly', () => {
  expect(wrapper.find('input').length).toEqual(1);
  expect(wrapper.find('p').length).toEqual(1);
  expect(wrapper.find('button').length).toEqual(1);
});

/**
 * Function to test local state and 
 * rendered denomination based on input text
 * 
 * @param {string} input - Value for input text
 * @param {boolean} inputValid - Expected value for inputValid state 
 * @param {string} denominations - Expected denomination
 * @param {string} key  - Value for trigger calculate button click or enter pressed
 */
const testCalculate = (input, inputValid, denominations, key) => {
  it(`Should calculate & render denominations correctly when input text: '${input}'`, () => {
    const event = {
      target: {
        value: input
      }
    };

    const mockEventClick = {
      key: undefined
    };

    const mockEventEnter = {
      key: 'Enter'
    };

    const inputText = wrapper.find('input');
    inputText.simulate('change', event);

    expect(wrapper.state('textInput')).toEqual(input);

    if (key === 'enter') {
      inputText.simulate('keyDown', mockEventEnter);
    } else {
      const button = wrapper.find('button');
      button.simulate('click', mockEventClick);
    }

    expect(wrapper.state('isInputValid')).toEqual(inputValid);
    expect(wrapper.state('denominations')).toContain(denominations);

    expect(wrapper.find('b').text()).toContain(denominations);
  });
};

/**
 * In Example test case there is '2000' fraction but in the requirement there isn't.
 */

testCalculate('15000', true, '1x Rp10000, 1x Rp5000', 'enter');
testCalculate('Rp3900', true, '3x Rp1000, 1x Rp500, 4x Rp100', 'click');
testCalculate('12510', true, '1x Rp10000, 2x Rp1000, 1x Rp500, left Rp10 (no available fraction)', 'enter');

testCalculate('18.215', true, '1x Rp10000, 1x Rp5000, 3x Rp1000, 2x Rp100, left Rp15 (no available fraction)', 'enter');
testCalculate('Rp17500', true, '1x Rp10000, 1x Rp5000, 2x Rp1000, 1x Rp500', 'enter');
testCalculate('Rp17.500,00', true, '1x Rp10000, 1x Rp5000, 2x Rp1000, 1x Rp500', 'enter');
testCalculate('Rp 120.325', true, '1x Rp100000, 1x Rp20000, 3x Rp100, left Rp25 (no available fraction)', 'enter');
testCalculate('005.000', true, '1x Rp5000', 'enter');
testCalculate('001000', true, '1x Rp1000', 'enter');


testCalculate('17,500', false, '', 'enter');
testCalculate('2 500', false, '', 'click');
testCalculate('3000 Rp', false, '', 'enter');
testCalculate('Rp', false, '', 'click');