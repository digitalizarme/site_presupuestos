import React from 'react';
import { shallow } from 'enzyme';
import { FormServiciosContainer } from '../../../src/features/servicios/FormServiciosContainer';

describe('servicios/FormServiciosContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      servicios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormServiciosContainer {...props} />
    );

    expect(
      renderedComponent.find('.servicios-form-servicios-container').length
    ).toBe(1);
  });
});
