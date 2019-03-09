import React from 'react';
import { shallow } from 'enzyme';
import { Pie } from '../../../src/features/esqueleto/Pie';

describe('esqueleto/Pie', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Pie {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-pie').length
    ).toBe(1);
  });
});
