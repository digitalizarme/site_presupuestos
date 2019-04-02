import React from 'react';
import { shallow } from 'enzyme';
import { FormConfiguraciones } from '../../../src/features/configuraciones';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormConfiguraciones />);
  expect(renderedComponent.find('.configuraciones-form-configuraciones').length).toBe(1);
});
