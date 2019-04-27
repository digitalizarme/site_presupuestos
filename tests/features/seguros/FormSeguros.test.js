import React from 'react';
import { shallow } from 'enzyme';
import { FormSeguros } from '../../../src/features/seguros';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormSeguros />);
  expect(renderedComponent.find('.seguros-form-seguros').length).toBe(1);
});
