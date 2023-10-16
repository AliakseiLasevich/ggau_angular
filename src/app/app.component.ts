import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loginSuccess } from './store/auth-store/auth.actions';
import { selectIsLoggedIn } from './store/auth-store/auth.selectors';
import { selectIsPlannerLoading } from './store/planner-store/planner-store.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isLoggedInSubscription: Subscription;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
    this.getStoredToken();
  }

  initializeListeners() {
    this.isLoggedInSubscription = this.store
      .select(selectIsLoggedIn)
      .subscribe((loggedIn) =>
        loggedIn
          ? this.router.navigate(['/planner'])
          : this.router.navigate(['/login'])
      );

    this.isLoading$ = this.store.select(selectIsPlannerLoading);
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

    if (token && tokenExpiresIn && + tokenExpiresIn > Date.now()) {
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
