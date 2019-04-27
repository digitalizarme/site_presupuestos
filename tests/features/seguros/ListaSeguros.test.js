import React from 'react';
import { shallow } from 'enzyme';
import { ListaSeguros } from '../../../src/features/seguros/ListaSeguros';

describe('seguros/ListaSeguros', () => {
  it('renders node with correct class name', () => {
    const props = {
      seguros: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaSeguros {...props} />
    );

    expect(
      renderedComponent.find('.seguros-lista-seguros').length
    ).toBe(1);
  });
});
