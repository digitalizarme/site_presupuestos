import React from 'react';
import { shallow } from 'enzyme';
import { MiUsuario } from '../../../src/features/usuarios/MiUsuario';

describe('usuarios/MiUsuario', () => {
  it('renders node with correct class name', () => {
    const props = {
      usuarios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MiUsuario {...props} />
    );

    expect(
      renderedComponent.find('.usuarios-mi-usuario').length
    ).toBe(1);
  });
});
