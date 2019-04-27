import React from 'react';
import { shallow } from 'enzyme';
import { PageMercaderiasGrupos } from '../../../src/features/mercaderias-grupos/PageMercaderiasGrupos';

describe('mercaderias-grupos/PageMercaderiasGrupos', () => {
  it('renders node with correct class name', () => {
    const props = {
      mercaderiasGrupos: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PageMercaderiasGrupos {...props} />
    );

    expect(
      renderedComponent.find('.mercaderias-grupos-page-mercaderias-grupos').length
    ).toBe(1);
  });
});
