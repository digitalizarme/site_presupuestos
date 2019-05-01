import React from 'react';
import { shallow } from 'enzyme';
import { ListaPresupuestos } from '../../../src/features/presupuestos/ListaPresupuestos';

describe('presupuestos/ListaPresupuestos', () => {
  it('renders node with correct class name', () => {
    const props = {
      presupuestos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaPresupuestos {...props} />
    );

    expect(
      renderedComponent.find('.presupuestos-lista-presupuestos').length
    ).toBe(1);
  });
});
