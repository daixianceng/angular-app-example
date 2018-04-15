import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-post-writing-tag-dialog',
  templateUrl: './post-writing-tag-dialog.component.html'
})
export class PostWritingTagDialogComponent implements OnInit {

  form: FormGroup;
  formValue: any;
  callback: Function | undefined;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.callback = data.callback;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.maxLength(10)
        ]
      ]
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  submit(e: Event): void {
    if (this.callback instanceof Function) {
      this.callback(this.formValue.name);
    }
    e.preventDefault();
  }
}
