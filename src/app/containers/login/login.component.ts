import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { dataIsSuccess } from 'app/common';
import { StyleService } from 'app/services';
import { AuthStore } from 'app/stores';
import { LoginForm, ErrorMessage, ResponseData } from 'app/models';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  model: LoginForm = new LoginForm();

  constructor(
    private formBuilder: FormBuilder,
    private authStore: AuthStore,
    private styleService: StyleService
  ) {
    styleService.addStyle('loginStyle', require('./style.css'));
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        this.model.username,
        [
          Validators.required
        ]
      ],
      password: [
        this.model.password,
        [
          Validators.required
        ]
      ]
    });
    this.form.valueChanges.forEach((formValue) => {
      this.model = {
        ...this.model,
        ...formValue
      };
    });
  }

  ngOnDestroy(): void {
    this.styleService.removeStyle('loginStyle');
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  submit(e: Event): void {
    this.authStore.login(this.model).subscribe((data: ResponseData) => {
      if (dataIsSuccess(data)) {
        this.authStore.navigate();
      }
    }, (errorResp: HttpErrorResponse) => {
      if (errorResp.status === 422) {
        errorResp.error.data.forEach((errorMessage: ErrorMessage) => {
          this.form.get(errorMessage.field).setErrors({
            message: errorMessage.message
          });
        });
      }
    });
    e.preventDefault();
  }
}
