import {Alert, InteractionManager, Keyboard} from 'react-native';
import {get} from 'lodash';

export const safeAlert = (title?: string, message?: string, ...args: any) => {
  // dismiss the keyboard
  Keyboard.dismiss();
  InteractionManager.runAfterInteractions(() => {
    // run after interactions
    setTimeout(() => {
      // put it on queue
      if (
        typeof title !== 'string' ||
        (message && typeof message !== 'string')
      ) {
        Alert.alert('Có lỗi xảy ra', 'Lỗi không xác định từ máy chủ', ...args);
      } else {
        Alert.alert(title, message, ...args);
      }
    }, 0);
  });
};

export const alertError = (error?: any, m?: string) => {
  if (typeof error === 'string') {
    return safeAlert('Có lỗi xảy ra', 'Lỗi không xác định từ máy chủ');
  }

  if (error && error.response) {
    if (error.response.data && typeof error.response.data !== 'string') {
      return safeAlert(
        'Thông báo',
        get(
          error,
          'response.data.error.fieldErrors.provider[0].message',
          '',
        ) !== '' || get(error, 'response.data.error.message', 'Error'),
      );
    } else {
      safeAlert(`Lỗi không xác định từ máy chủ , ${error.message}`, m);
    }
  }
};
