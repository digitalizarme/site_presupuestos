import React from 'react';
import { shallow } from 'enzyme';
import { ComisionesContainer } from '../../../src/features/informes/ComisionesContainer';

describe('informes/ComisionesContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      informes: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ComisionesContainer {...props} />
    );

    expect(
      renderedComponent.find('.informes-comisiones-container').length
    ).toBe(1);
  });
});
