let api_string;
if (process.env.NODE_ENV === 'development') {
  api_string = 'http://localhost:3000';
}
else{
  api_string = 'https://us-central1-digitalizarmepy.cloudfunctions.net/api';
}
export const API = api_string;
