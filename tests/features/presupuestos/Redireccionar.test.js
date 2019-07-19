import React from 'react';
import { shallow } from 'enzyme';
import { Redireccionar } from '../../../src/features/presupuestos';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Redireccionar />);
  expect(renderedComponent.find('.presupuestos-redireccionar').length).toBe(1);
});
