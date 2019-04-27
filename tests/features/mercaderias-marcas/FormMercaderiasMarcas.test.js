import React from 'react';
import { shallow } from 'enzyme';
import { FormMercaderiasMarcas } from '../../../src/features/mercaderias-marcas';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormMercaderiasMarcas />);
  expect(renderedComponent.find('.mercaderias-marcas-form-mercaderias-marcas').length).toBe(1);
});
