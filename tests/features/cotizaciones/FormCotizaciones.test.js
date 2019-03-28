import React from 'react';
import { shallow } from 'enzyme';
import { FormCotizaciones } from '../../../src/features/cotizaciones';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormCotizaciones />);
  expect(renderedComponent.find('.cotizaciones-form-cotizaciones').length).toBe(1);
});
