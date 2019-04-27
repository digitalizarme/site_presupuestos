import React from 'react';
import { shallow } from 'enzyme';
import { ListaMercaderiasGrupos } from '../../../src/features/mercaderias-grupos/ListaMercaderiasGrupos';

describe('mercaderias-grupos/ListaMercaderiasGrupos', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderiasGrupos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaMercaderiasGrupos {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-grupos-lista-mercaderias-grupos').length
    ).toBe(1);
  });
});
