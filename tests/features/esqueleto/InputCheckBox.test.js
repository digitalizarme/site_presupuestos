import React from 'react';
import { shallow } from 'enzyme';
import { InputCheckBox } from '../../../src/features/esqueleto';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<InputCheckBox />);
  expect(renderedComponent.find('.esqueleto-input-check-box').length).toBe(1);
});
