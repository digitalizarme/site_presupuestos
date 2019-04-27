import React from 'react';
import { shallow } from 'enzyme';
import { ListaServiciosGrupo } from '../../../src/features/servicios-grupos/ListaServiciosGrupo';

describe('servicios-grupos/ListaServiciosGrupo', () => {
  it('renders node with correct class name', () => {
    const props = {
      serviciosGrupo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaServiciosGrupo {...props} />
    );

    expect(
      renderedComponent.find('.servicios-grupos-lista-servicios-grupo').length
    ).toBe(1);
  });
});
