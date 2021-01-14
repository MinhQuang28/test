import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {stringify} from 'query-string';
import {Alert} from 'react-native';

import {store} from '../../store/index';
import CONFIG from '../../config/index';
import action from '../../store/action';

//function alertSessionTimeout() {
//   if (!sessionExpired) {
//     sessionExpired = true;
//     Alert.alert('Thông báo', 'Phiên đăng nhập hết hạn', [
//       {
//         text: 'Ok',
//         onPress: () => {
//           store.dispatch(action.authenticate.doLogout());
//           sessionExpired = false;
//         },
//       },
//     ]);
//   }
// }

const authorizedRequest: AxiosInstance = axios.create({
  baseURL: CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (parameters) => {
    return stringify(parameters, {arrayFormat: 'comma'});
  },
});

authorizedRequest.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = {...config};
  if (config.data instanceof FormData) {
    newConfig.headers.common['Content-Type'] = 'multipart/form-data';
  }
  return newConfig;
});

let sessionExpired = false;

authorizedRequest.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response.data;
  },
  (error: AxiosError<any>) => {
    if (error && error.response && error.response.status === 401) {
      // alertSessionTimeout();
      return new Promise(() => {});
    }
    throw error;
  },
);

export default authorizedRequest;
