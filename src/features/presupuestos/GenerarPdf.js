import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, Image, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import logo from '../../images/logo_digitalizarame.png';
import image2base64 from 'image-to-base64';
import styled from '@react-pdf/styled-components';
import moment from 'moment';
import api_axio from '../../common/api_axios';
import formatarNumero from '../../common/formatarNumero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';

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
const MyDocument = ({ props }) => {
  return (
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
            <Valor>{moment(props.presupuesto.updatedAt).format('DD/MM/YYYY')}</Valor>
            <Valor style={styles.espacioArriba}>{props.presupuesto.id}</Valor>
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
            <Valor8Izquierda>{props.presupuesto.persona.c_nombre}</Valor8Izquierda>
            <Valor8Izquierda style={styles.espacioArriba}>
              {props.presupuesto.persona.c_direccion}
            </Valor8Izquierda>
          </ClienteValor>
        </Linea35>
        <Linea>
          <SeccionItems>
            <Campo8>ITEMS - MONEDA: {props.presupuesto.moneda.c_descripcion}</Campo8>
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
        {props.items.map((item, indice) => (
          <Linea key={indice}>
            <SeccionDescValor>
              <Campo8>{item.c_descripcion}</Campo8>
            </SeccionDescValor>
            <SeccionCant>
              <Campo8>{item.n_cantidad}</Campo8>
            </SeccionCant>
            <Seccion10>
              <Valor8>
                {formatarNumero(item.n_unitario, props.presupuesto.moneda.n_decimales, true)}
              </Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>
                {formatarNumero(item.n_flete, props.presupuesto.moneda.n_decimales, true)}
              </Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>
                {formatarNumero(item.n_exentas, props.presupuesto.moneda.n_decimales, true)}
              </Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>
                {formatarNumero(item.n_gravadas_5, props.presupuesto.moneda.n_decimales, true)}
              </Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>
                {formatarNumero(item.n_gravadas_10, props.presupuesto.moneda.n_decimales, true)}
              </Valor8>
            </Seccion10>
          </Linea>
        ))}
      </Page>
    </Document>
  );
};

export class GenerarPdf extends Component {
  static propTypes = {
    idPresupuesto: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.blob = this.blob.bind(this);
    this.state = {
      img: null,
      items: [],
      presupuesto: {},
      cuotas: [],
    };
  }

  abrirPDF = (url, download) => {
    var tag_a = document.createElement('a');
    document.body.appendChild(tag_a);
    tag_a.style = 'display: none';
    tag_a.href = url;
    tag_a.download = download;
    tag_a.target = '_blank';
    tag_a.click();
  };

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
    const { idPresupuesto } = this.props;
    const { api_axio } = this.props.actions;

    this.blob();
    api_axio({
      api_funcion: `presupuestos/${idPresupuesto}`,
    }).then(res => {
      this.setState(state => ({ presupuesto: res.data }));
    });
    api_axio({
      api_funcion: `presupuestos/cuotas/${idPresupuesto}`,
    }).then(res => {
      this.setState(state => ({ cuotas: res.data }));
    });
    api_axio({
      api_funcion: `presupuestos/itemsMercaderiasServicios/${idPresupuesto}`,
    }).then(res => {
      this.setState(state => ({ items: res.data }));
    });
  };

  render() {
    const { img, items, presupuesto, cuotas } = this.state;
    const props = {
      ...this.state,
      ...this.props,
    };

    const cargado =
      Object.keys(items).length > 0 &&
      Object.keys(presupuesto).length > 0 &&
      Object.keys(cuotas).length > 0 &&
      img;
    const archivo = cargado
      ? `presupuesto_${presupuesto.id}_${presupuesto.persona.c_nombre
          .replace(/[^a-z0-9]/gi, '_')
          .toLowerCase()}.pdf`
      : 'sin_nimbre.pdf';
    return (
      <div className="presupuestos-generar-pdf">
        {cargado ? (
          <PDFDownloadLink fileName={archivo} document={<MyDocument props={props} blob={img} />}>
            {({ blob, url, loading, error }) =>{
              return loading ? (
                <span className="btn-danger btn btn-md"><FontAwesomeIcon icon={faSpinner} /></span>
              ) : (
                <span className="btn-success btn btn-md" >
                  <FontAwesomeIcon icon={faDownload} />
                </span>
              )

            }
            }
          </PDFDownloadLink>
        ) : (
          <span className="btn-danger btn btn-md"><FontAwesomeIcon icon={faSpinner} /></span>
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    configuracion: state.configuraciones.configuracion,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ api_axio }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenerarPdf);
