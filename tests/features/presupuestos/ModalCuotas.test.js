import React from 'react';
import { shallow } from 'enzyme';
import { ModalCuotas } from '../../../src/features/presupuestos/ModalCuotas';

describe('presupuestos/ModalCuotas', () => {
  it('renders node with correct class name', () => {
    const props = {
      presupuestos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ModalCuotas {...props} />
    );

    expect(
      renderedComponent.find('.presupuestos-modal-cuotas').length
    ).toBe(1);
  });
});
