import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginSuccess } from './modules/auth/store/auth.actions';
import { selectIsLoggedIn } from './modules/auth/store/auth.selectors';
import { selectIsSharedLoading } from './shared/shared-store/shared-store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.getStoredToken();

    this.loggedIn$.subscribe((loggedIn) =>
      loggedIn
        ? this.router.navigate(['/planner'])
        : this.router.navigate(['/login'])
    );
  }

  initializeListeners() {
    console.log(this.store);
    this.loggedIn$ = this.store.select(selectIsLoggedIn);
    this.isLoading$ = this.store.select(selectIsSharedLoading);
  }

  private getStoredToken() {
    const {
      token,
      tokenExpiresIn,
      name,
      lastname,
      refreshToken,
      refreshExpiresIn,
    }: {
      token: string;
      tokenExpiresIn: string;
      name: string;
      lastname: string;
      refreshToken: string;
      refreshExpiresIn: string;
    } = this.getLocalStorageData();

    if (token && tokenExpiresIn && +tokenExpiresIn > Date.now()) {
      this.store.dispatch(
        loginSuccess({
          name: name,
          lastname: lastname,
          refresh_token: {
            token: refreshToken,
            expires_in: parseInt(refreshExpiresIn),
          },
          access_token: {
            token: token,
            expires_in: parseInt(tokenExpiresIn),
          },
        })
      );
    }
  }

  private getLocalStorageData() {
    const token: string = localStorage.getItem('token') || '';
    const tokenExpiresIn: string =
      localStorage.getItem('token_expiresIn') || '';
    const refreshToken: string = localStorage.getItem('refresh_token') || '';
    const refreshExpiresIn: string =
      localStorage.getItem('refresh_expires_in') || '';
    const name: string = localStorage.getItem('name') || '';
    const lastname: string = localStorage.getItem('lastname') || '';
    return {
      token,
      tokenExpiresIn,
      name,
      lastname,
      refreshToken,
      refreshExpiresIn,
    };
  }
}
