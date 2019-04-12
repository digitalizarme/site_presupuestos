import React from 'react';
import { shallow } from 'enzyme';
import { DragDrop } from '../../../src/features/esqueleto/DragDrop';

describe('esqueleto/DragDrop', () => {
  it('renders node with correct class name', () => {
    const props = {
      esqueleto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DragDrop {...props} />
    );

    expect(
      renderedComponent.find('.esqueleto-drag-drop').length
    ).toBe(1);
  });
});
