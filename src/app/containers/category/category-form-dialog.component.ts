import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { dataIsSuccess } from 'app/common';
import { CategoryStore } from 'app/stores';
import { Category, ErrorMessage, ResponseData } from 'app/models';
import { SCENARIO_DEFAULT, SCENARIO_CREATE } from 'app/common';

@Component({
  selector: 'app-category-form-dialog',
  templateUrl: './category-form-dialog.component.html'
})
export class CategoryFormDialogComponent implements OnInit {

  title: string;
  scenario: string;
  form: FormGroup;
  formValue: any;
  model: Category;
  callback: Function | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private categoryStore: CategoryStore,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.title = data.title;
    this.scenario = data.scenario || SCENARIO_DEFAULT;
    this.callback = data.callback;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        this.model.name,
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ],
      key: [
        this.model.key,
        [
          Validators.required,
          Validators.maxLength(255)
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

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get key(): AbstractControl {
    return this.form.get('key');
  }

  get modelMerged(): Category {
    return {
      ...this.model,
      ...this.formValue
    };
  }

  submit(e: Event): void {
    (() => {
      if (this.scenario === SCENARIO_CREATE) {
        return this.categoryStore.create(this.modelMerged);
      } else {
        return this.categoryStore.update(this.modelMerged);
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
