import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import logo from '../../images/logo_digitalizarame.png';
import image2base64 from 'image-to-base64';
import styled from '@react-pdf/styled-components';

const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return URL.createObjectURL(blob);
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    margin: 15,
  },
  logo: {
    width: 50,
    height: 50,
  },
  espacioArriba: {
    marginTop: 8,
  },
  negrito: {
    fontWeight: 'bold',
  },
  margin10: {
    margin: 10,
  },
});

const Linea50 = styled.View`
  width: 95%;
  height: 50px;
  flex-direction: row;
`;

const Linea30 = styled.View`
  width: 95%;
  height: 30px;
  flex-direction: row;
`;

const Linea35 = styled.View`
  width: 95%;
  height: 35px;
  flex-direction: row;
`;

const Linea = styled.View`
  width: 95%;
  flex-direction: row;
`;

const SeccionLogo = styled.View`
  marging: 10px;
  border: 1px solid #000;
  border-right: 0;
  border-bottom: 0;
  width: 10%;
`;

const Seccion1 = styled.View`
  padding-top: 5px;
  border: 1px solid #000;
  border-left: 0;
  border-bottom: 0;
  border-right: 0;
  font-size: 14px;
  width: 10%;
`;

const Cliente = styled.View`
  border: 1px solid #000;
  border-right: 0;
  width: 8%;
  padding-top: 5px;
  padding-left: 5px;
`;
const ClienteValor = styled.View`
  border: 1px solid #000;
  border-left: 0;
  padding-left: 2px;
  padding-top: 5px;
  width: 92%;
`;

const Seccion2 = styled.View`
  padding-top: 5px;
  font-size: 14px;
  width: 55%;
  border: 1px solid #000;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
`;

const Seccion3 = styled.View`
  padding-top: 5px;
  font-size: 14px;
  text-align: right;
  border: 1px solid #000;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  width: 14%;
`;
const Seccion4 = styled.View`
  padding-top: 5px;
  padding-right: 5px;
  font-size: 14px;
  text-align: right;
  width: 11%;
  border: 1px solid #000;
  border-left: 0;
  border-bottom: 0;
`;

const SeccionSlogan = styled.View`
  font-size: 14px;
  text-align: center;
  height: 13px;
  width: 100%;
  border: 1px solid #000;
  border-top: 0;
  border-bottom: 0;
`;

const SeccionItems = styled.View`
  text-align: center;
  height: 20px;
  width: 100%;
  border: 1px solid #000;
  padding-top: 5px;
  margin-top: 5px;
`;

const SeccionDesc = styled.View`
  width: 45%;
  border: 1px solid #000;
  border-top: 0;
  height: 20px;
  padding-top: 5px;
`;

const SeccionDescValor = styled.View`
  width: 45%;
  border: 1px solid #000;
  border-top: 0;
  height: 30px;
  padding-left: 2px;
  padding-right: 2px;
`;

const SeccionCant = styled.View`
  width: 5%;
  border: 1px solid #000;
  padding-top: 5px;
  border-top: 0;
  border-left: 0;
`;

const Seccion10 = styled.View`
  width: 10%;
  border: 1px solid #000;
  padding-top: 5px;
  border-top: 0;
  border-left: 0;
`;

const Campo = styled.Text`
  font-size: 10px;
  font-weight: 700;
`;

const Campo8 = styled.Text`
  font-size: 8px;
  font-weight: 900;
  text-align: center;
`;

const Campo8Derecha = styled.Text`
  font-size: 8px;
  font-weight: 900;
  text-align: right;
`;

const Valor8 = styled.Text`
  font-size: 8px;
  text-align: right;
  padding-right: 2px;
`;
const Valor8Izquierda = styled.Text`
  font-size: 8px;
  text-align: left;
`;
const Valor = styled.Text`
  font-size: 10px;
`;

// Create Document Component
const MyDocument = props => {
  //console.log(props.configuracion.t_logo);
  return (
    <PDFViewer height={window.innerHeight} width="100%">
      <Document>
        <Page size="A4" style={styles.page}>
          <Linea50>
            <SeccionLogo>
              {props.blob ? <Image src={props.blob} style={styles.logo} /> : null}
            </SeccionLogo>
            <Seccion1>
              <Campo>Empresa:</Campo>
              <Campo style={styles.espacioArriba}>Dirección:</Campo>
            </Seccion1>
            <Seccion2>
              <Valor>{props.configuracion.c_razon_social}</Valor>
              <Valor style={styles.espacioArriba}>{props.configuracion.c_direccion}</Valor>
            </Seccion2>
            <Seccion3>
              <Campo>Fecha:</Campo>
              <Campo style={styles.espacioArriba}>Presupuesto N.:</Campo>
            </Seccion3>
            <Seccion4>
              <Valor>01/01/2000</Valor>
              <Valor style={styles.espacioArriba}>000001</Valor>
            </Seccion4>
          </Linea50>
          <Linea>
            <SeccionSlogan>
              <Campo8 style={styles.negrito}>{props.configuracion.c_slogan}</Campo8>
            </SeccionSlogan>
          </Linea>
          <Linea35>
            <Cliente>
              <Campo8Derecha>Cliente:</Campo8Derecha>
              <Campo8Derecha style={styles.espacioArriba}>Dirección:</Campo8Derecha>
            </Cliente>
            <ClienteValor>
              <Valor8Izquierda>Cliente xxxx</Valor8Izquierda>
              <Valor8Izquierda style={styles.espacioArriba}>
                {props.configuracion.c_direccion}
              </Valor8Izquierda>
            </ClienteValor>
          </Linea35>
          <Linea>
            <SeccionItems>
              <Campo8>ITEMS - MONEDA: DOLAR</Campo8>
            </SeccionItems>
          </Linea>
          <Linea>
            <SeccionDesc>
              <Campo8>DESCRIPCIÓN</Campo8>
            </SeccionDesc>
            <SeccionCant>
              <Campo8>CANT.</Campo8>
            </SeccionCant>
            <Seccion10>
              <Campo8>UNITARIO</Campo8>
            </Seccion10>
            <Seccion10>
              <Campo8>FLETE</Campo8>
            </Seccion10>
            <Seccion10>
              <Campo8>EXENTAS</Campo8>
            </Seccion10>
            <Seccion10>
              <Campo8>GRAV. 5%</Campo8>
            </Seccion10>
            <Seccion10>
              <Campo8>GRAV. 10%</Campo8>
            </Seccion10>
          </Linea>
          <Linea>
            <SeccionDescValor>
              <Campo8>
                Alienware M15 Gaming Laptop Intel i7-8750H, 15.6" 300 Nits FHD 144hz Refresh Rate
                -16GB, 2x8GB, 512GB PCIe M.2 SSD, RTX 2060 6GB, 17.9mm Thick & 4.78lbs
              </Campo8>
            </SeccionDescValor>
            <SeccionCant>
              <Campo8>999</Campo8>
            </SeccionCant>
            <Seccion10>
              <Valor8>100.000.0000</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>100.000.0000</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>100.000.000</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>100.000.000</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>100.000.000</Valor8>
            </Seccion10>
          </Linea>
        </Page>
      </Document>
    </PDFViewer>
  );
};

const MyDocument3 = props => {
  //console.log(props.configuracion.t_logo);
  return (
    <div size="A4" style={styles.page}>
      <div style={styles.section_logo}>
        {props.blob ? <img alt="logo" src={props.blob} style={styles.logo} /> : null}
      </div>
      <div style={styles.section}>
        <div>Empresa: {props.configuracion.c_razon_social}</div>
      </div>
    </div>
  );
};

export class GenerarPdf extends Component {
  static propTypes = {
    presupuestos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.blob = this.blob.bind(this);

    this.state = {
      img: null,
    };
  }

  blob() {
    if (this.props.configuracion.t_logo) {
      const b = b64toBlob(this.props.configuracion.t_logo.slice(22));
      this.setState(state => ({ img: b }));
    } else {
      image2base64(logo)
        .then(response => {
          const b = b64toBlob(response);
          this.setState(state => ({ img: b }));
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount = () => {
    this.blob();
  };

  render() {
    const { img } = this.state;
    return (
      <div className="presupuestos-generar-pdf">
        {img ? <MyDocument {...this.props} blob={img} /> : 'Carregando...'}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    presupuestos: state.presupuestos,
    configuracion: state.configuraciones.configuracion,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenerarPdf);
