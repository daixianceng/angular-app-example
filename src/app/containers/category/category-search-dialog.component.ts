import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CategorySearch } from 'app/models';

@Component({
  selector: 'app-category-search-dialog',
  templateUrl: './category-search-dialog.component.html'
})
export class CategorySearchDialogComponent implements OnInit {

  form: FormGroup;
  formValue: any;
  model: CategorySearch;
  callback: Function | undefined;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.callback = data.callback;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.model.name,
      key: this.model.key,
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get key(): AbstractControl {
    return this.form.get('key');
  }

  get modelMerged(): CategorySearch {
    const formValue = this.formValue;
    if (formValue) {
      return {
        ...this.model,
        name: formValue.name,
        key: formValue.key,
      };
    } else {
      return { ...this.model };
    }
  }

  submit(e: Event): void {
    if (this.callback instanceof Function) {
      this.callback(this.modelMerged);
    }
    e.preventDefault();
  }
}
