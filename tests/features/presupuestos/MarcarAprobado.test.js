import React from 'react';
import { shallow } from 'enzyme';
import { MarcarAprobado } from '../../../src/features/presupuestos/MarcarAprobado';

describe('presupuestos/MarcarAprobado', () => {
  it('renders node with correct class name', () => {
    const props = {
      presupuestos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MarcarAprobado {...props} />
    );

    expect(
      renderedComponent.find('.presupuestos-marcar-aprobado').length
    ).toBe(1);
  });
});
