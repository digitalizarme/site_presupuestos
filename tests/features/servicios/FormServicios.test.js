import React from 'react';
import { shallow } from 'enzyme';
import { FormServicios } from '../../../src/features/servicios';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormServicios />);
  expect(renderedComponent.find('.servicios-form-servicios').length).toBe(1);
});
