import { Injectable } from '@angular/core';
import { AuthResponseInterface } from '../interfaces/auth.interfaces';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ActionTypes } from './actionTypes';
import { loginFailure, loginSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LOGIN),
      switchMap(({ userData }) => {
        return this.authService.authenticate(userData).pipe(
          map((response: AuthResponseInterface) =>
            loginSuccess({
              access_token: response.access_token,
              refresh_token: response.refresh_token,
              name: response.name,
              lastname: response.lastname,
            })
          ),
          catchError((error) => {
            this.authService.handleAuthFailure(error);
            return of(loginFailure(error.message));
          })
        );
      })
    )
  );

  storeTokenInLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionTypes.LOGIN_SUCCESS),
        tap((response: AuthResponseInterface) => {
          localStorage.setItem('token', response.access_token.token);
          localStorage.setItem(
            'token_expiresIn',
            response.access_token.expires_in.toString()
          );
          localStorage.setItem('refresh_token', response.refresh_token.token);
          localStorage.setItem(
            'refresh_expires_in',
            response.refresh_token.expires_in.toString()
          );
          localStorage.setItem('name', response.name);
          localStorage.setItem('lastname', response.lastname);
        })
      ),
    { dispatch: false } // This effect does not dispatch any new actions
  );
}
