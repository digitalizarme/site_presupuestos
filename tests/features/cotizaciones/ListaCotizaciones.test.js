import React from 'react';
import { shallow } from 'enzyme';
import { ListaCotizaciones } from '../../../src/features/cotizaciones/ListaCotizaciones';

describe('cotizaciones/ListaCotizaciones', () => {
  it('renders node with correct class name', () => {
    const props = {
      cotizaciones: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaCotizaciones {...props} />
    );

    expect(
      renderedComponent.find('.cotizaciones-lista-cotizaciones').length
    ).toBe(1);
  });
});
