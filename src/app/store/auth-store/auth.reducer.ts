import { createReducer, on } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/core/models/backendErrors.interface';
import { loginAction, loginFailure, loginSuccess } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  loading: boolean;
  accessToken: string;
  refreshToken: string;
  name: string;
  lastname: string;
  error: BackendErrorInterface | null;
}

const initialState: AuthState = {
  loggedIn: false,
  loading: false,
  accessToken: '',
  refreshToken: '',
  name: '',
  lastname: '',
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginAction, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, payload) => ({
    ...state,
    loading: false,
    loggedIn: true,
    accessToken: payload.access_token.token,
    refreshToken: payload.refresh_token.token,
    name: payload.name,
    lastname: payload.lastname,
  })),
  on(loginFailure, (state, payload) => ({ ...state, error: payload.error }))
);
