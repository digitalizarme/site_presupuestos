import React from 'react';
import { shallow } from 'enzyme';
import { PageServiciosGrupo } from '../../../src/features/servicios-grupos/PageServiciosGrupo';

describe('servicios-grupos/PageServiciosGrupo', () => {
  it('renders node with correct class name', () => {
    const props = {
      serviciosGrupo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageServiciosGrupo {...props} />
    );

    expect(
      renderedComponent.find('.servicios-grupos-page-servicios-grupo').length
    ).toBe(1);
  });
});
