import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  alphaNumericPattern = /^[a-zA-Z0-9]*$/;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      login: [
        null,
        [Validators.required, Validators.pattern(this.alphaNumericPattern)],
      ],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  initializeValues() {
    // this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
