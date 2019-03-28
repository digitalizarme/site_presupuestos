import React from 'react';
import { shallow } from 'enzyme';
import { PageCotizaciones } from '../../../src/features/cotizaciones/PageCotizaciones';

describe('cotizaciones/PageCotizaciones', () => {
  it('renders node with correct class name', () => {
    const props = {
      cotizaciones: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageCotizaciones {...props} />
    );

    expect(
      renderedComponent.find('.cotizaciones-page-cotizaciones').length
    ).toBe(1);
  });
});
