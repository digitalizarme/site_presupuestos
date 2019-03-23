import React from 'react';
import { shallow } from 'enzyme';
import { InputNumber } from '../../../src/features/esqueleto';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputNumber />);
  expect(renderedComponent.find('.esqueleto-input-number').length).toBe(1);
});
