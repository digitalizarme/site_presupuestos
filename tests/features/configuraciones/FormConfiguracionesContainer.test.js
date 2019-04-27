import React from 'react';
import { shallow } from 'enzyme';
import { FormConfiguracionesContainer } from '../../../src/features/configuraciones/FormConfiguracionesContainer';

describe('configuraciones/FormConfiguracionesContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      configuraciones: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormConfiguracionesContainer {...props} />
    );

    expect(
      renderedComponent.find('.configuraciones-form-configuraciones-container').length
    ).toBe(1);
  });
});
