import React from 'react';
import { shallow } from 'enzyme';
import { Listar } from '../../../src/features/contacto/Listar';

describe('contacto/Listar', () => {
  it('renders node with correct class name', () => {
    const props = {
      contacto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Listar {...props} />
    );

    expect(
      renderedComponent.find('.contacto-listar').length
    ).toBe(1);
  });
});
