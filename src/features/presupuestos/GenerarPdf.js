import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Page, Image, Document, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import logo from '../../images/logo_digitalizarame.png';
import image2base64 from 'image-to-base64';
import styled from '@react-pdf/styled-components';
import moment from 'moment';
import api_axio from '../../common/api_axios';
import formatarNumero from '../../common/formatarNumero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDownload,
  faSpinner,
  faPrint,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import is from 'is_js';

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

const Seccion100 = styled.View`
  text-align: center;
  height: 20px;
  width: 100%;
  border: 1px solid #000;
  padding-top: 5px;
  margin-top: 5px;
`;

const Seccion100SinBordes = styled.View`
  text-align: center;
  width: 100%;
  padding-top: 5px;
  margin-top: 5px;
`;

const Seccion50Firma = styled.View`
  text-align: center;
  height: 40px;
  width: 50%;
  border: 1px solid #000;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  padding-top: 5px;
  margin-top: 40px;
`;
const Seccion25Firma = styled.View`
  height: 40px;
  width: 25%;
  padding-top: 5px;
  margin-top: 40px;
`;

const Seccion50Izquierda = styled.View`
  height: 17px;
  width: 50%;
  border: 1px solid #000;
  padding-left: 2px;
  padding-top: 2px;
`;
const Seccion50 = styled.View`
  height: 17px;
  width: 50%;
  border: 1px solid #000;
  border-left: 0;
  padding-left: 2px;
  padding-top: 2px;
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
  max-height: 30px;
  padding-left: 2px;
  padding-right: 2px;
`;
const Seccion70 = styled.View`
  width: 70%;
  border: 1px solid #000;
  border-top: 0;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 5px;
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
const Seccion30 = styled.View`
  width: 30%;
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
const Campo8Izquierda = styled.Text`
  font-size: 8px;
  font-weight: 900;
  text-align: left;
`;

const Campo8Derecha = styled.Text`
  font-size: 8px;
  font-weight: 900;
  text-align: right;
`;

const Campo12Derecha = styled.Text`
  font-size: 12px;
  font-weight: 900;
  text-align: right;
`;

const Valor12 = styled.Text`
  font-size: 12px;
  text-align: right;
  padding-right: 2px;
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
const MyDocument = ({ props, archivo }) => {
  const decimales = parseInt(props.presupuesto.moneda.n_decimales);
  let indices = [];
  return (
    <Document title={archivo} author={props.configuracion.c_razon_social}>
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
            <Valor>{props.configuracion.c_razon_social.toUpperCase()}</Valor>
            <Valor style={styles.espacioArriba}>
              {props.configuracion.c_direccion.toUpperCase()}
            </Valor>
          </Seccion2>
          <Seccion3>
            <Campo>Fecha:</Campo>
            <Campo style={styles.espacioArriba}>Presupuesto N.:</Campo>
          </Seccion3>
          <Seccion4>
            <Valor>{moment(props.presupuesto.updatedAt).format('DD/MM/YYYY')}</Valor>
            <Valor style={styles.espacioArriba}>
              {props.presupuesto.id.toString().padStart(9, '0')}
            </Valor>
          </Seccion4>
        </Linea50>
        <Linea>
          <SeccionSlogan>
            <Campo8 style={styles.negrito}>{props.configuracion.c_slogan.toUpperCase()}</Campo8>
          </SeccionSlogan>
        </Linea>
        <Linea35>
          <Cliente>
            <Campo8Derecha>Cliente:</Campo8Derecha>
            <Campo8Derecha style={styles.espacioArriba}>Dirección:</Campo8Derecha>
          </Cliente>
          <ClienteValor>
            <Valor8Izquierda>{props.presupuesto.persona.c_nombre.toUpperCase()}</Valor8Izquierda>
            <Valor8Izquierda style={styles.espacioArriba}>
              {props.presupuesto.persona.c_direccion.toUpperCase()}
            </Valor8Izquierda>
          </ClienteValor>
        </Linea35>
        <Linea>
          <Seccion100>
            <Campo8>ITEMS - MONEDA: {props.presupuesto.moneda.c_descripcion}</Campo8>
          </Seccion100>
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
              <Campo8Izquierda>{item.c_descripcion.toUpperCase()}</Campo8Izquierda>
            </SeccionDescValor>
            <SeccionCant>
              <Campo8>{item.n_cantidad}</Campo8>
            </SeccionCant>
            <Seccion10>
              <Valor8>{formatarNumero(item.n_unitario, decimales, true)}</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>{formatarNumero(item.n_flete, decimales, true)}</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>{formatarNumero(item.n_exentas, decimales, true)}</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>{formatarNumero(item.n_gravadas_5, decimales, true)}</Valor8>
            </Seccion10>
            <Seccion10>
              <Valor8>{formatarNumero(item.n_gravadas_10, decimales, true)}</Valor8>
            </Seccion10>
          </Linea>
        ))}
        <Linea>
          <Seccion70>
            <Campo8Derecha>Subtotal</Campo8Derecha>
          </Seccion70>
          <Seccion10>
            <Valor8>{formatarNumero(props.presupuesto.n_total_exentas, decimales, true)}</Valor8>
          </Seccion10>
          <Seccion10>
            <Valor8>{formatarNumero(props.presupuesto.n_total_5, decimales, true)}</Valor8>
          </Seccion10>
          <Seccion10>
            <Valor8>{formatarNumero(props.presupuesto.n_total_10, decimales, true)}</Valor8>
          </Seccion10>
        </Linea>
        <Linea>
          <Seccion70>
            <Campo8Derecha>IVA items</Campo8Derecha>
          </Seccion70>
          <Seccion10>
            <Valor8>0</Valor8>
          </Seccion10>
          <Seccion10>
            <Valor8>{formatarNumero(props.presupuesto.n_total_iva_5, decimales, true)}</Valor8>
          </Seccion10>
          <Seccion10>
            <Valor8>{formatarNumero(props.presupuesto.n_total_iva_10, decimales, true)}</Valor8>
          </Seccion10>
        </Linea>
        <Linea>
          <Seccion70>
            <Campo8Derecha>Comisión</Campo8Derecha>
          </Seccion70>
          <Seccion30>
            <Valor8>{formatarNumero(props.presupuesto.n_valor_comision, decimales, true)}</Valor8>
          </Seccion30>
        </Linea>
        <Linea>
          <Seccion70>
            <Campo8Derecha>Seguro</Campo8Derecha>
          </Seccion70>
          <Seccion30>
            <Valor8>{formatarNumero(props.presupuesto.n_valor_seguro, decimales, true)}</Valor8>
          </Seccion30>
        </Linea>
        <Linea>
          <Seccion70>
            <Campo8Derecha>Descuento/Redondeo</Campo8Derecha>
          </Seccion70>
          <Seccion30>
            <Valor8>{formatarNumero(props.presupuesto.n_desc_redondeo, decimales, true)}</Valor8>
          </Seccion30>
        </Linea>
        <Linea>
          <Seccion70>
            <Campo12Derecha>Total General</Campo12Derecha>
          </Seccion70>
          <Seccion30>
            <Valor12>{formatarNumero(props.presupuesto.n_total_general, decimales, true)}</Valor12>
          </Seccion30>
        </Linea>
        <Linea>
          <Seccion100>
            <Campo8>
              Entrega(aproximada) de {props.presupuesto.n_dias_entrega} días. Pagos (Cuotas):
            </Campo8>
          </Seccion100>
        </Linea>
        {props.cuotas.map((item, indice, cuotas) => {
          let retorno;
          if (!indices.includes(indice)) {
            retorno = (
              <Linea key={`key1${indice}`}>
                <Seccion50Izquierda key={`coluna1key${indice}`}>
                  <Campo8Izquierda>
                    {item.n_nr_cuota}) Valor: {formatarNumero(item.n_valor, decimales, true)}{' '}
                    Vencimiento: {moment(item.d_fecha_vcto).format('DD/MM/YYYY')}
                  </Campo8Izquierda>
                </Seccion50Izquierda>
                {typeof cuotas[indice + 1] !== 'undefined' && (
                  <Seccion50 key={`coluna2key${indice}`}>
                    <Campo8Izquierda>
                      {cuotas[indice + 1].n_nr_cuota}) Valor:{' '}
                      {formatarNumero(cuotas[indice + 1].n_valor, decimales, true)} Vencimiento:{' '}
                      {moment(cuotas[indice + 1].d_fecha_vcto).format('DD/MM/YYYY')}
                    </Campo8Izquierda>
                  </Seccion50>
                )}
              </Linea>
            );
            indices.push(indice, indice + 1);
          }
          return retorno;
        })}
        <Linea>
          <Seccion100SinBordes>
            <Campo8>{props.configuracion.t_obs_presup_1}</Campo8>
          </Seccion100SinBordes>
        </Linea>
        <Linea>
          <Seccion100SinBordes>
            <Campo8>{props.configuracion.t_obs_presup_2}</Campo8>
          </Seccion100SinBordes>
        </Linea>
        <Linea>
          <Seccion25Firma />
          <Seccion50Firma>
            <Campo8>
              {props.presupuesto.persona.c_nombre.toUpperCase()} -{' '}
              {props.presupuesto.persona.c_identificacion}
            </Campo8>
          </Seccion50Firma>
        </Linea>
      </Page>
    </Document>
  );
};

const PdfVisualizar = ({ props, cargado, archivo }) => {
  if (is.ios()) {
    return <PdfDescargar props={props} cargado={cargado} archivo={archivo} />;
  } else {
    if (cargado) {
      const body = document.body,
        html = document.documentElement;

      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const width = Math.max(
        body.scrollWidth,
        body.offsetWidth,
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth,
      );
      document.body.style.marginBottom = 0;

      return (
        <PDFViewer width={width} height={height}>
          <MyDocument props={props} archivo={archivo} />
        </PDFViewer>
      );
    } else {
      return 'Cargando...';
    }
  }
};

const pdf_ios = (blob) => {
//var fileBlob = new Blob([blob], {type: 'application/pdf'});
window.open(blob, '_blank');
return true;

}

const PdfDescargar = ({ cargado, props, archivo }) => {
  return cargado ? (
    <PDFDownloadLink fileName={archivo} document={<MyDocument props={props} archivo={archivo} />}>
      {({ blob, url, loading, error }) => {
        return loading ? (
          !is.ios() ? (
            <span className="btn-danger btn btn-md">
              <FontAwesomeIcon icon={faSpinner} />
            </span>
          ) : (
            'Cargando...'
          )
        ) : !error ? (
          !is.ios() ? (
            <span className="btn-success btn btn-md">
              <FontAwesomeIcon icon={faDownload} />
            </span>
          ) : (
            pdf_ios(url)
          )
        ) : !is.ios() ? (
          <span className="btn-danger btn btn-md">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>
        ) : (
          'Error al tratar de generar el PDF'
        );
      }}
    </PDFDownloadLink>
  ) : !is.ios() ? (
    <span className="btn-danger btn btn-md">
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  ) : (
    'Cargando...'
  );
};

export class GenerarPdf extends Component {
  static propTypes = {
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
      showComponent: false,
    };
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _onButtonClick(idPresupuesto) {
    if (is.ios() || is.desktop()) {
      window.open(`/presupuestos/generar_pdf/${idPresupuesto}`);
    } else {
      this.setState({
        showComponent: true,
      });

      this.descargaInfos(idPresupuesto);
    }
  }

  descargaInfos = idPresupuesto => {
    const { api_axio } = this.props.actions;

    api_axio({
      api_funcion: `presupuestos/${idPresupuesto}`,
    }).then(res => {
      this.setState(state => ({ presupuesto: res.data }));
    });
    api_axio({
      api_funcion: `presupuestos/cuotas/${idPresupuesto}`,
    }).then(res => {
      this.setState(state => ({ cuotas: res.data }));
      api_axio({
        api_funcion: `presupuestos/itemsMercaderiasServicios/${idPresupuesto}`,
      }).then(res => {
        this.setState(state => ({ items: res.data }));
      });
    });
    this.blob();
  };

  componentDidMount = () => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      const idPresupuesto = this.props.match.params.id;
      this.descargaInfos(idPresupuesto);
    }
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

  render() {
    const { img, items, presupuesto } = this.state;
    let { idPresupuesto } = this.props;
    const { showComponent } = this.state;
    const props = {
      ...this.state,
      ...this.props,
      blob: img,
    };
    let modoDescarga = true;

    if (!idPresupuesto) {
      idPresupuesto = this.props.match.params.id;
      modoDescarga = false;
    }

    const cargado = Object.keys(items).length > 0 && Object.keys(presupuesto).length > 0 && img;
    const archivo = cargado
      ? `presupuesto_${presupuesto.id}_${presupuesto.persona.c_nombre
          .replace(/[^a-z0-9]/gi, '_')
          .toLowerCase()}.pdf`
      : 'sin_nombre.pdf';
    return (
      <div className="presupuestos-generar-pdf">
        {showComponent && modoDescarga ? (
          <PdfDescargar cargado={cargado} archivo={archivo} props={props} />
        ) : modoDescarga ? (
          <button
            className="btn-primary btn btn-md"
            title="Gerar PDF"
            onClick={() => {
              return this._onButtonClick(idPresupuesto);
            }}
          >
            <FontAwesomeIcon icon={faPrint} />
          </button>
        ) : (
          <PdfVisualizar cargado={cargado} props={props} archivo={archivo} />
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
