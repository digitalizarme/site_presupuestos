import axios from 'axios';

import { hasToken, getToken } from '../common/tokenManager';

/**
 * set auth header
 */
axios.interceptors.request.use((config) => {
  if (hasToken()) {
    config.headers.common['Authorization'] = `Bearer ${getToken()}`;
  }

  config.headers.common['Accept'] = 'application/json';
  config.headers.common['Content-Type'] = 'application/json';

  return config;
});
