import React from 'react';
import { shallow } from 'enzyme';
import { FormMercaderiasGrupos } from '../../../src/features/mercaderias-grupos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormMercaderiasGrupos />);
  expect(renderedComponent.find('.mercaderias-grupos-form-mercaderias-grupos').length).toBe(1);
});
