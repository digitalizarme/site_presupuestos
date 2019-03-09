import React from 'react';
import { shallow } from 'enzyme';
import { PageServiciosGrupo } from '../../../src/features/servicios-grupo/PageServiciosGrupo';

describe('servicios-grupo/PageServiciosGrupo', () => {
  it('renders node with correct class name', () => {
    const props = {
      serviciosGrupo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageServiciosGrupo {...props} />
    );

    expect(
      renderedComponent.find('.servicios-grupo-page-servicios-grupo').length
    ).toBe(1);
  });
});
