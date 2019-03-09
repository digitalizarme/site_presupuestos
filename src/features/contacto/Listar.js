import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listar } from './redux/actions';
import { Button } from 'reactstrap';

export class Listar extends Component {
  static propTypes = {
    contacto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { listarPending, items, listarError } = this.props.contacto;
    const { listar } = this.props.actions;

    return (
      <div className="contacto-listar">
        <Button color="danger" disabled={listarPending} onClick={listar}>
          {listarPending ? 'Listando...' : 'Listar contactos'}
        </Button>
        {listarError && (
          <div className="fetch-list-error">Error al traer los datos: {listarError.toString()}</div>
        )}
        {items.length > 0 ? (
          <ul className="examples-reddit-list">
            {items.map(item => (
              <li key={item.id}>
                <p>{item.firstName + ' ' + item.firstName }</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-items-tip">Sin items.</div>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    contacto: state.contacto,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ listar }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listar);
