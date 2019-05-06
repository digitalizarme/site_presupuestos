import React from 'react';
import { shallow } from 'enzyme';
import { FormPresupuestosContainer } from '../../../src/features/presupuestos/FormPresupuestosContainer';

describe('presupuestos/FormPresupuestosContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      presupuestos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormPresupuestosContainer {...props} />
    );

    expect(
      renderedComponent.find('.presupuestos-form-presupuestos-container').length
    ).toBe(1);
  });
});
