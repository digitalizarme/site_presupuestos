import React from 'react';
import { shallow } from 'enzyme';
import { FormPresupuestos } from '../../../src/features/presupuestos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormPresupuestos />);
  expect(renderedComponent.find('.presupuestos-form-presupuestos').length).toBe(1);
});
