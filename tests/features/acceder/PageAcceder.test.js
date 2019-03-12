import React from 'react';
import { shallow } from 'enzyme';
import { PageAcceder } from '../../../src/features/acceder/PageAcceder';

describe('acceder/PageAcceder', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageAcceder {...props} />
    );

    expect(
      renderedComponent.find('.acceder-page-acceder').length
    ).toBe(1);
  });
});
