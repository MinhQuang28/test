import { fork } from '@redux-saga/core/effects';

import userSaga from './Users/user.saga';

export default function* rootSaga() {
  try {
    yield fork(userSaga);
  } catch (e) {
    console.log(e);
  }
}
