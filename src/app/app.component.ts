import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/planner']);
    }
  }
}
