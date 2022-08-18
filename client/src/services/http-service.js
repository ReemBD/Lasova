import Axios from 'axios';
import { accessTokenService } from './access-token.service';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:8000/api/';

var axios = Axios.create({});
axios.interceptors.request.use((config) => {
  const accessToken = accessTokenService.getToken();
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  return config;
});

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${JSON.stringify(
        data,
        null,
        2
      )}`
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
    }
    throw err;
  }
}
