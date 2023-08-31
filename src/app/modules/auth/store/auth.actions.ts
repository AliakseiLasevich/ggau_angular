import { createAction, props } from '@ngrx/store';
import { BackendErrorInterface } from 'src/app/shared/types/backendErrors.interface';
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
  props<{ error: BackendErrorInterface }>()
);
