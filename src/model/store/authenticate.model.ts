export interface UserInfoModel {
  username: string;
  id: string;
  displayName: string;
  uuid: string;
}

export interface AuthenticateStoreState {
  token: string;
  userInfo?: UserInfoModel;
  deviceToken: string;
  uuid: string;
  loading: boolean;
  error: string;
}
