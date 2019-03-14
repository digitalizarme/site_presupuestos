import React from 'react';
import { shallow } from 'enzyme';
import { PageUsuarios } from '../../../src/features/usuarios/PageUsuarios';

describe('usuarios/PageUsuarios', () => {
  it('renders node with correct class name', () => {
    const props = {
      usuarios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageUsuarios {...props} />
    );

    expect(
      renderedComponent.find('.usuarios-page-usuarios').length
    ).toBe(1);
  });
});
