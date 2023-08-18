import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectIsLoading,
  selectIsLoggedIn,
} from './modules/auth/store/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loggedIn$: Observable<boolean> = this.store.select(selectIsLoggedIn);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.loggedIn$.subscribe((loggedIn) =>
      loggedIn
        ? this.router.navigate(['/planner'])
        : this.router.navigate(['/login'])
    );
  }
}
