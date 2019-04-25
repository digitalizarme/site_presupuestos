import React from 'react';
import { shallow } from 'enzyme';
import { PageServicios } from '../../../src/features/servicios/PageServicios';

describe('servicios/PageServicios', () => {
  it('renders node with correct class name', () => {
    const props = {
      servicios: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageServicios {...props} />
    );

    expect(
      renderedComponent.find('.servicios-page-servicios').length
    ).toBe(1);
  });
});
