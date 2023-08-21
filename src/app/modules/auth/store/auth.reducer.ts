import { createReducer, on } from '@ngrx/store';
import { loginAction, loginSuccess } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string;
  refreshToken: string;
  name: string;
  lastname: string;
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  accessToken: '',
  refreshToken: '',
  name: '',
  lastname: '',
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({ ...state, loading: true })),
  on(loginSuccess, (state, payload) => ({
    ...state,
    loading: false,
    loggedIn: true,
    accessToken: payload.access_token.token,
    refreshToken: payload.refresh_token.token,
    name: payload.name,
    lastname: payload.lastname,
  }))
);
