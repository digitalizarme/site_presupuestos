import React from 'react';
import { shallow } from 'enzyme';
import { FormServGrupo } from '../../../src/features/servicios-grupo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormServGrupo />);
  expect(renderedComponent.find('.servicios-grupo-form-serv-grupo').length).toBe(1);
});
