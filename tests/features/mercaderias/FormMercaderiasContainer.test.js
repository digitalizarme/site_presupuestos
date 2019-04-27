import React from 'react';
import { shallow } from 'enzyme';
import { FormMercaderiasContainer } from '../../../src/features/mercaderias/FormMercaderiasContainer';

describe('mercaderias/FormMercaderiasContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderias: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FormMercaderiasContainer {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-form-mercaderias-container').length
    ).toBe(1);
  });
});
