import { combineReducers } from 'redux';
import StoreState from '../model/store';
import userReducer from './Users/user.reducer';


const rootReducer = combineReducers<StoreState>({
  user: userReducer,
});

export default rootReducer;
