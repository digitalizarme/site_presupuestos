import React from 'react';
import { shallow } from 'enzyme';
import { PageConfiguraciones } from '../../../src/features/configuraciones/PageConfiguraciones';

describe('configuraciones/PageConfiguraciones', () => {
  it('renders node with correct class name', () => {
    const props = {
      configuraciones: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageConfiguraciones {...props} />
    );

    expect(
      renderedComponent.find('.configuraciones-page-configuraciones').length
    ).toBe(1);
  });
});
