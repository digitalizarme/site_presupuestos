import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/deslogar/DefaultPage';

describe('deslogar/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      deslogar: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.deslogar-default-page').length
    ).toBe(1);
  });
});
