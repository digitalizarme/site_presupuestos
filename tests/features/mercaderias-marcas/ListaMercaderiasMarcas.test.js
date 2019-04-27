import React from 'react';
import { shallow } from 'enzyme';
import { ListaMercaderiasMarcas } from '../../../src/features/mercaderias-marcas/ListaMercaderiasMarcas';

describe('mercaderias-marcas/ListaMercaderiasMarcas', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderiasMarcas: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaMercaderiasMarcas {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-marcas-lista-mercaderias-marcas').length
    ).toBe(1);
  });
});
