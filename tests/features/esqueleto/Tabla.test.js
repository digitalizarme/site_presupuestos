import React from 'react';
import { shallow } from 'enzyme';
import { Tabla } from '../../../src/features/esqueleto/Tabla';

describe('esqueleto/Tabla', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Tabla {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-tabla').length
    ).toBe(1);
  });
});
