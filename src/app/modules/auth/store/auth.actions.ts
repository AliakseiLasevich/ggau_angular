import { createAction, props } from '@ngrx/store';
import {
  AuthRequestInterface,
  AuthResponseInterface,
} from '../interfaces/auth.interfaces';
import { ActionTypes } from './auth.actionTypes';

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ userData: AuthRequestInterface }>()
);

export const loginSuccess = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<AuthResponseInterface>()
);

export const loginFailure = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ payload: string }>()
);
