import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import { stringify } from 'query-string';
import { Alert } from 'react-native';

import { store } from '../../store/index';
import CONFIG from '../../config/index';

const unauthorizedRequest: AxiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (parameters) => {
    return stringify(parameters, { arrayFormat: 'comma' });
  },
});

unauthorizedRequest.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.common['Authorization'] =
    store.getState().authenticate?.token || '';
  return config;
});

unauthorizedRequest.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data;
  },
  (error: AxiosError<any>) => {
    // if (error && error.response && error.response.status === 401) {
    //   Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn');
    // }
    throw error;
  },
);

export default unauthorizedRequest;
