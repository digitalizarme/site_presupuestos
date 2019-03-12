import React from 'react';
import { shallow } from 'enzyme';
import { PageHome } from '../../../src/features/home/PageHome';

describe('home/PageHome', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(<PageHome {...props} />);

    expect(renderedComponent.find('.home-page-home').length).toBe(1);
  });
});
