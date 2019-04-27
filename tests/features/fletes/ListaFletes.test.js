import React from 'react';
import { shallow } from 'enzyme';
import { ListaFletes } from '../../../src/features/fletes/ListaFletes';

describe('fletes/ListaFletes', () => {
  it('renders node with correct class name', () => {
    const props = {
      fletes: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaFletes {...props} />
    );

    expect(
      renderedComponent.find('.fletes-lista-fletes').length
    ).toBe(1);
  });
});
