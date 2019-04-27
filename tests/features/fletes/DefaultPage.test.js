import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/fletes/DefaultPage';

describe('fletes/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      fletes: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.fletes-default-page').length
    ).toBe(1);
  });
});
