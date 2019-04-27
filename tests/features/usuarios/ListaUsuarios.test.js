import React from 'react';
import { shallow } from 'enzyme';
import { ListaUsuarios } from '../../../src/features/usuarios/ListaUsuarios';

describe('usuarios/ListaUsuarios', () => {
  it('renders node with correct class name', () => {
    const props = {
      usuarios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaUsuarios {...props} />
    );

    expect(
      renderedComponent.find('.usuarios-lista-usuarios').length
    ).toBe(1);
  });
});
