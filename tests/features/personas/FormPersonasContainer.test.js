import React from 'react';
import { shallow } from 'enzyme';
import { FormPersonasContainer } from '../../../src/features/personas/FormPersonasContainer';

describe('personas/FormPersonasContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      personas: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormPersonasContainer {...props} />
    );

    expect(
      renderedComponent.find('.personas-form-personas-container').length
    ).toBe(1);
  });
});
