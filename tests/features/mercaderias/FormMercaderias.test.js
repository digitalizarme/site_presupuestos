import React from 'react';
import { shallow } from 'enzyme';
import { FormMercaderias } from '../../../src/features/mercaderias';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<FormMercaderias />);
  expect(renderedComponent.find('.mercaderias-form-mercaderias').length).toBe(1);
});
