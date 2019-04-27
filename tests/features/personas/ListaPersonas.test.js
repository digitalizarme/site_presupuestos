import React from 'react';
import { shallow } from 'enzyme';
import { ListaPersonas } from '../../../src/features/personas/ListaPersonas';

describe('personas/ListaPersonas', () => {
  it('renders node with correct class name', () => {
    const props = {
      persona: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaPersonas {...props} />
    );

    expect(
      renderedComponent.find('.personas-lista-personas').length
    ).toBe(1);
  });
});
