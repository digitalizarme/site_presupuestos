import React from 'react';
import { shallow } from 'enzyme';
import { PagePersonas } from '../../../src/features/personas/PagePersonas';

describe('personas/PagePersonas', () => {
  it('renders node with correct class name', () => {
    const props = {
      persona: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PagePersonas {...props} />
    );

    expect(
      renderedComponent.find('.personas-page-personas').length
    ).toBe(1);
  });
});
