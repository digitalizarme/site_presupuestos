let api_string;
if (process.env.NODE_ENV === 'development') {
  api_string = 'http://192.168.1.105:3000';
}
else{
  api_string = 'https://apidigitalizarme.herokuapp.com';
}

export const API = api_string;
