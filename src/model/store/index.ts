import { PersistPartial } from 'redux-persist/es/persistReducer';
import { AuthenticateStoreState } from './authenticate.model';
import { UserStoreState } from './user.model';
interface State {
  // authenticate: AuthenticateStoreState & PersistPartial;
  user: UserStoreState
}

type StoreState = Readonly<State>;

export default StoreState;
