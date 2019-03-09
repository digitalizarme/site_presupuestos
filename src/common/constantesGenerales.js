let api_string;
if (process.env.NODE_ENV === 'development') {
  api_string = 'http://localhost:3000';
}
else{
  api_string = 'https://apidigitalizarme.herokuapp.com/';
}

export const API = api_string;
