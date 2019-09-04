import React from 'react';
import { shallow } from 'enzyme';
import { FormComision } from '../../../src/features/informes';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormComision />);
  expect(renderedComponent.find('.informes-form-comision').length).toBe(1);
});
