import axios from 'axios';
import { API } from './constantesGenerales';
import swal from 'sweetalert';
import history from './history';

export default ({ api_funcion, params, type_begin, type_success, type_failure }) => {
  return dispatch => {
    // optionally you can have getState as the second argument
    if (type_begin) {
      dispatch({
        type: type_begin.type,
        data: typeof type_begin.data !== 'undefined' ? type_begin.data : null,
      });
    }

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios({
        method: params && params.method?params.method:'get',
        url: `${API}/${api_funcion}`,
        data: params && params.data?params.data:null,
        params:params && params.data?null:params,
      });
      // const doRequest = axios.get(`${API}/${api_funcion}`, { params, data: params });
      doRequest.then(
        res => {
          if (type_success) {
            dispatch({
              type: type_success.type,
              data: res.data,
            });
          }
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          console.log(err);
          if (typeof err.response !== "undefined" && err.response.status === 401) {
            swal({
              title: 'Ops',
              text: 'Su sesion expirió o no has iniciado la sesión',
              icon: 'warning',
              button: 'OK!',
            }).then(value => {
              history.push('/');
            });
          }
          if (type_failure) {
            dispatch({
              type: type_failure.type,
              data: { error: err },
            });
          }
          reject(err);
        },
      );
    });

    return promise;
  };
};
