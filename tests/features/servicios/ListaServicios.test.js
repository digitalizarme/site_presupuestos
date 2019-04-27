import React from 'react';
import { shallow } from 'enzyme';
import { ListaServicios } from '../../../src/features/servicios/ListaServicios';

describe('servicios/ListaServicios', () => {
  it('renders node with correct class name', () => {
    const props = {
      servicios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaServicios {...props} />
    );

    expect(
      renderedComponent.find('.servicios-lista-servicios').length
    ).toBe(1);
  });
});
