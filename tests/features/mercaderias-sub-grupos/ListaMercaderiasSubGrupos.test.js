import React from 'react';
import { shallow } from 'enzyme';
import { ListaMercaderiasSubGrupos } from '../../../src/features/mercaderias-sub-grupos/ListaMercaderiasSubGrupos';

describe('mercaderias-sub-grupos/ListaMercaderiasSubGrupos', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderiasSubGrupos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaMercaderiasSubGrupos {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-sub-grupos-lista-mercaderias-sub-grupos').length
    ).toBe(1);
  });
});
