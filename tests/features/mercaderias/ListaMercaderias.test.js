import React from 'react';
import { shallow } from 'enzyme';
import { ListaMercaderias } from '../../../src/features/mercaderias/ListaMercaderias';

describe('mercaderias/ListaMercaderias', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderias: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ListaMercaderias {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-lista-mercaderias').length
    ).toBe(1);
  });
});
