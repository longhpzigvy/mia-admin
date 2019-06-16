import axios from 'axios';

export function configAxios() {
  axios.defaults.baseURL = '/api';
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
}

export function configToken(token) {
  axios.defaults.headers.common.Authorization = `Beaver ${token}`;
}
