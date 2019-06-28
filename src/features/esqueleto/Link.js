import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Link as LinkDom } from 'react-router-dom';

export default class Link extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  render() {
    const { history,className,to } = this.props;
    return (
      <Router history={history}>
        <LinkDom className={className} to={to}>
          {this.props.children}
        </LinkDom>
      </Router>
    );
  }
}
