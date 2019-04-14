import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Dropzone from 'react-dropzone';
import redimensionarImagem from '../../common/redimensionarImagem';

let width, height, minSize, multiple;

export class DragDrop extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onDrop = acceptedFiles => {
    const { setaImg } = this.props.actions;
    const {
      input: {  onChange }
    } = this.props;
    redimensionarImagem(acceptedFiles[0], width, height).then(imgRedimensionada =>
    {
      onChange(imgRedimensionada.file);
      return setaImg(imgRedimensionada);

    }
    );
  };

  render() {
    const {preview} = this.props;
    const {
      input: {  value }
    } = this.props;
    const imagem = preview?preview:value?value:'';
    width = this.props.width ? this.props.width : 75;
    height = this.props.height ? this.props.height : 75;
    minSize = this.props.minSize ? this.props.minSize : 1;
    multiple = this.props.multiple ? this.props.multiple : false;
    const {
      meta: { touched, error, warning },
    } = this.props;
    return (
      <div className="esqueleto-drag-drop">
        <div className={touched && error ? 'con_error' : touched ? 'sin_error' : null}>
        <Dropzone
          onDrop={this.onDrop}
          accept="image/jpeg, image/png"
          minSize={minSize}
          multiple={multiple}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              Clique aqui o arrastre una imagem! La dimension sera {width} x {height}
              {imagem ? (
                <img src={imagem} alt="img escolhida" style={{ maxWidth: 70, MaxHeight: 70 }} />
              ) : null}
            </div>
          )}
        </Dropzone>
          {touched &&
            ((error && <span className="error invalid-feedback">{error}</span>) ||
              (warning && <span className="warning">{warning}</span>))}
      </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  //  console.log(state);
  return {
    esqueleto: state.esqueleto,
    preview: state.esqueleto.img ? state.esqueleto.img.file : null,
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
)(DragDrop);
