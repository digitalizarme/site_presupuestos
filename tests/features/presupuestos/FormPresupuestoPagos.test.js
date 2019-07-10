import React from 'react';
import { shallow } from 'enzyme';
import { FormPresupuestoPagos } from '../../../src/features/presupuestos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormPresupuestoPagos />);
  expect(renderedComponent.find('.presupuestos-form-presupuesto-pagos').length).toBe(1);
});
