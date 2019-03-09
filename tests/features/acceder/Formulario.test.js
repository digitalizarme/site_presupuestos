import React from 'react';
import { shallow } from 'enzyme';
import { Formulario } from '../../../src/features/login';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Formulario />);
  expect(renderedComponent.find('.acceder-formulario').length).toBe(1);
});
