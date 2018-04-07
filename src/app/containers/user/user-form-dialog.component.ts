import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { dataIsSuccess, SCENARIO_DEFAULT, SCENARIO_CREATE } from 'app/common';
import { UserStore } from 'app/stores';
import { User, USER_STATUS, ErrorMessage, ResponseData } from 'app/models';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html'
})
export class UserFormDialogComponent implements OnInit {

  title: string;
  scenario: string;
  form: FormGroup;
  formValue: any;
  model: User;
  statusOptions = USER_STATUS;
  callback: Function | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userStore: UserStore,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.title = data.title;
    this.scenario = data.scenario || SCENARIO_DEFAULT;
    this.callback = data.callback;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        this.model.username,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]
      ],
      email: [
        this.model.email,
        [
          Validators.required,
          // Validates when control value isn't empty
          (control: AbstractControl) => control.value ? Validators.email(control) : null
        ]
      ],
      status: [
        { value: this.model.status, disabled: this.readOnly },
        [
          Validators.required
        ]
      ],
      passwordNew: [
        this.model.passwordNew,
        [
          this.scenario === SCENARIO_CREATE ? Validators.required : Validators.nullValidator,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ]
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
  }

  get readOnly(): boolean {
    return this.scenario === SCENARIO_DEFAULT;
  }

  get username(): AbstractControl {
    return this.form.get('username');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get status(): AbstractControl {
    return this.form.get('status');
  }

  get passwordNew(): AbstractControl {
    return this.form.get('passwordNew');
  }

  get modelMerged(): User {
    return {
      ...this.model,
      ...this.formValue
    };
  }

  submit(e: Event): void {
    (() => {
      if (this.scenario === SCENARIO_CREATE) {
        return this.userStore.create(this.modelMerged);
      } else {
        return this.userStore.update(this.modelMerged);
      }
    })().subscribe((data: ResponseData) => {
      if (dataIsSuccess(data)) {
        this.handleSuccess();
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

  private handleSuccess(): void {
    if (this.callback instanceof Function) {
      this.callback();
    }
  }
}
