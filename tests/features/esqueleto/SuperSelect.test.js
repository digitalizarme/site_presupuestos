import React from 'react';
import { shallow } from 'enzyme';
import { SuperSelect } from '../../../src/features/esqueleto';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SuperSelect />);
  expect(renderedComponent.find('.esqueleto-super-select').length).toBe(1);
});
