import React from 'react';
import { shallow } from 'enzyme';
import { FormUsuario } from '../../../src/features/usuarios';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormUsuario />);
  expect(renderedComponent.find('.usuarios-form-usuario').length).toBe(1);
});
