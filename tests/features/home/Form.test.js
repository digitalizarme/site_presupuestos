import React from 'react';
import { shallow } from 'enzyme';
import { Form } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Form />);
  expect(renderedComponent.find('.home-form').length).toBe(1);
});
