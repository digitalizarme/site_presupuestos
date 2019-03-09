import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/contacto/DefaultPage';

describe('contacto/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      contacto: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.contacto-default-page').length
    ).toBe(1);
  });
});
