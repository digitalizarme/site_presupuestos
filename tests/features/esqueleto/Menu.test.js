import React from 'react';
import { shallow } from 'enzyme';
import { Menu } from '../../../src/features/esqueleto/Menu';

describe('esqueleto/Menu', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Menu {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-menu').length
    ).toBe(1);
  });
});
