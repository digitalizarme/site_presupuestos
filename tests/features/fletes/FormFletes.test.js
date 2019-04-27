import React from 'react';
import { shallow } from 'enzyme';
import { FormFletes } from '../../../src/features/fletes';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormFletes />);
  expect(renderedComponent.find('.fletes-form-fletes').length).toBe(1);
});
