import React from 'react';
import { shallow } from 'enzyme';
import { FormPersonas } from '../../../src/features/personas';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormPersonas />);
  expect(renderedComponent.find('.personas-form-personas').length).toBe(1);
});
