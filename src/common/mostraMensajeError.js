import swal from 'sweetalert';

const mostraMensajeError = ({err, msgPadron}) => {
        if (typeof err.response !== 'undefined' && err.response.status !== 401 && err.response.status !== 404) {
          const { message } =
            typeof err.response !== 'undefined' && typeof err.response.data !== 'undefined'
              ? err.response.data
              : msgPadron;
          swal({
            title: 'Ops',
            text: message ? message : msgPadron,
            icon: 'error',
            button: 'OK!',
          });
        }
}

export default mostraMensajeError;
