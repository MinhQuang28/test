import { all, takeLatest, call, put } from 'redux-saga/effects';
import * as getUsers from './user.action';
import { safeAlert } from '../../helper/Alert';


function* getHospitals(
  action: ReturnType<typeof getUsers.getUser.request>,
) {
  try {
    // const response = yield call(getUser, action.payload);

    yield put(getUsers.getUser.success({user:'ahihi'}));
  } catch (e) {
    safeAlert(e);
    yield put(getUsers.getUser.failure(e));
  }
}

export default function* hospitalSaga() {
  yield all([takeLatest(getUsers.getUser.request, getHospitals)]);
}
