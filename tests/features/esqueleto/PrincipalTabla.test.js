import React from 'react';
import { shallow } from 'enzyme';
import { PrincipalTabla } from '../../../src/features/esqueleto/PrincipalTabla';

describe('esqueleto/PrincipalTabla', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PrincipalTabla {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-principal-tabla').length
    ).toBe(1);
  });
});
