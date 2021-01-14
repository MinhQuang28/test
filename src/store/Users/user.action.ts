import { createAsyncAction } from 'typesafe-actions';
import { UserStoreState, UserInfo } from '../../model/store/user.model';

export interface GET_USER_SUCCESS_PAYLOAD extends UserInfo {}

export const getUser = createAsyncAction(
  'GET_HOSPITAL',
  'GET_HOSPITAL_SUCCEEDED',
  'GET_HOSPITAL_FAILED',
)<string, GET_USER_SUCCESS_PAYLOAD, string>();
