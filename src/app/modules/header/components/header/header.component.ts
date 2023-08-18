import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectNameLastname } from 'src/app/modules/auth/store/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName$: Observable<string> = this.store.select(selectNameLastname);

  constructor(private store: Store<{ auth: string }>) {}
}
