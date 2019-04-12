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
    redimensionarImagem(acceptedFiles[0], width, height).then(imgRedimensionada =>
      setaImg(imgRedimensionada),
    );
  };

  render() {
    const preview = this.props.esqueleto.img ? this.props.esqueleto.img.file : null;

    width = this.props.width ? this.props.width : 75;
    height = this.props.height ? this.props.height : 75;
    minSize = this.props.minSize ? this.props.minSize : 1;
    multiple = this.props.multiple ? this.props.multiple : false;

    return (
      <div className="esqueleto-drag-drop">
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
              {preview ? (
                <img src={preview} alt="img escolhida" style={{ maxWidth: 70, MaxHeight: 70 }} />
              ) : null}
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  // console.log(state);
  return {
    esqueleto: state.esqueleto,
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
