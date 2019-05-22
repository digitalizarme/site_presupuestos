import React from 'react';
import { shallow } from 'enzyme';
import { FormItemsMercaderiasServicios } from '../../../src/features/presupuestos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormItemsMercaderiasServicios />);
  expect(renderedComponent.find('.presupuestos-form-items-mercaderias-servicios').length).toBe(1);
});
