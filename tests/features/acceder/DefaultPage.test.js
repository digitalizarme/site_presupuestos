import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/acceder/DefaultPage';

describe('acceder/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.acceder-default-page').length
    ).toBe(1);
  });
});
