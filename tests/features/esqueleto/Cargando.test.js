import React from 'react';
import { shallow } from 'enzyme';
import { Cargando } from '../../../src/features/esqueleto/Cargando';

describe('esqueleto/Cargando', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Cargando {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-cargando').length
    ).toBe(1);
  });
});
