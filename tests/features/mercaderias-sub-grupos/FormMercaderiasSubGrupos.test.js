import React from 'react';
import { shallow } from 'enzyme';
import { FormMercaderiasSubGrupos } from '../../../src/features/mercaderias-sub-grupos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormMercaderiasSubGrupos />);
  expect(renderedComponent.find('.mercaderias-sub-grupos-form-mercaderias-sub-grupos').length).toBe(1);
});
