import React from 'react';
import { shallow } from 'enzyme';
import { Link } from '../../../src/features/esqueleto';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Link />);
  expect(renderedComponent.find('.esqueleto-link').length).toBe(1);
});
