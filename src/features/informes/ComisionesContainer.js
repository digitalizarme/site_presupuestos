import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FormComision from './FormComision';
import { Principal } from '../esqueleto';
import { reduxForm} from 'redux-form';
import { listaMonedas } from '../cotizaciones/redux/actions';
import { traerPersonasComisionistas } from '../personas/redux/actions';
import { traerPersonasClientes } from '../personas/redux/actions';
import { traerComisiones } from './redux/actions';
import swal from 'sweetalert';
import mostraMensajeError from '../../common/mostraMensajeError';



export class ComisionesContainer extends Component {
  static propTypes = {
    informes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { listaMonedas, traerPersonasComisionistas, traerPersonasClientes } = this.props.actions;
    listaMonedas();
    traerPersonasComisionistas();
    traerPersonasClientes();
  };

  submit = values => {
    const { traerComisiones } = this.props.actions;
    return traerComisiones(values)
      .then(res => {
        if (res.data && res.data.length === 0) {
          swal({
            title: 'Ops',
            text: 'No hay comisión con los datos ingresados',
            icon: 'warning',
            button: 'OK!',
          });
        }
        else {
          //Aqui vai mandar gerar o PDF
        }
      })
      .catch(err => mostraMensajeError({ err, msgPadron: 'Error al intentar traer los datos del informe' }));
  };

  render() {
    const { handleSubmit, optionsMonedas } = this.props;

    return (
      <div className="informes-comisiones-container">
        <Principal
          titulo={'Informe de Comisiones'}
          component={FormComision}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
          optionsMonedas={optionsMonedas}
        />
      </div>
    );
  }
}

ComisionesContainer = reduxForm({
  // a unique name for the form
  form: 'formComisiones',
  enableReinitialize: true,
})(ComisionesContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const optionsMonedas = [];
  const optionsComisionista = [];
  const optionsClientes = [];

  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    monedaObj = {
      label: moneda.c_descripcion,
      value: moneda.id,
    };
    optionsMonedas.push(monedaObj);
  }

  let comisionistaObj = {};
  for (let persona of state.personas.comisionistas) {
    comisionistaObj = {
      label: `${persona.c_nombre}  ${persona.c_identificacion}`,
      value: persona.id,
    };
    optionsComisionista.push(comisionistaObj);
  }

  let clientesObj = {};
  for (let persona of state.personas.clientes) {
    clientesObj = {
      label: persona.c_nombre,
      value: persona.id,
    };
    optionsClientes.push(clientesObj);
  }

  return {
    informes: state.informes,
    optionsMonedas,
    optionsComisionista,
    optionsClientes,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { listaMonedas, traerPersonasComisionistas, traerComisiones, traerPersonasClientes },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComisionesContainer);
