import React from 'react';
import { shallow } from 'enzyme';
import { Principal } from '../../../src/features/esqueleto/Principal';

describe('esqueleto/Principal', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Principal {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-principal').length
    ).toBe(1);
  });
});
