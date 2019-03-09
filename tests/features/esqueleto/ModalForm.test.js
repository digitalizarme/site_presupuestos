import React from 'react';
import { shallow } from 'enzyme';
import { ModalForm } from '../../../src/features/esqueleto/ModalForm';

describe('esqueleto/ModalForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ModalForm {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-modal-form').length
    ).toBe(1);
  });
});
