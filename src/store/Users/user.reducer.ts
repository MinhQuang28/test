import { createReducer } from 'typesafe-actions';
import { getUser } from './user.action';
import { UserStoreState } from '../../model/store/user.model';

const initialState: UserStoreState = {
  user: null,
  loading: false,
  error: '',
};

const hospitalReducer = createReducer<UserStoreState>(initialState)
  .handleAction(getUser.request, (state: UserStoreState) => ({
    loading: true,
    error: '',
    user: null,
  }))
  .handleAction(
    getUser.success,
    (
      state: UserStoreState,
      action: ReturnType<typeof getUser.success>,
    ) => ({
      ...state,
      loading: false,
      user: action.payload,
    }),
  )
  .handleAction(
    getUser.failure,
    (
      state: UserStoreState,
      action: ReturnType<typeof getUser.failure>,
    ) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  );

export default hospitalReducer;
