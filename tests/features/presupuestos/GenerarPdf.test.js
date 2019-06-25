import React from 'react';
import { shallow } from 'enzyme';
import { GenerarPdf } from '../../../src/features/presupuestos/GenerarPdf';

describe('presupuestos/GenerarPdf', () => {
  it('renders node with correct class name', () => {
    const props = {
      presupuestos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GenerarPdf {...props} />
    );

    expect(
      renderedComponent.find('.presupuestos-generar-pdf').length
    ).toBe(1);
  });
});
