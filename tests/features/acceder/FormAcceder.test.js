import React from 'react';
import { shallow } from 'enzyme';
import { FormAcceder } from '../../../src/features/login';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormAcceder />);
  expect(renderedComponent.find('.acceder-form-acceder').length).toBe(1);
});
