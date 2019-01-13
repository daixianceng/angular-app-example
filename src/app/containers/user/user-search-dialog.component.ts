import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { MediaObserver } from '@angular/flex-layout';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { splitTimeRange, concatTimesFormatByISOString, TIME_RANGE_SEPARATOR } from 'app/common';
import { UserSearch, USER_STATUS } from 'app/models';

@Component({
  selector: 'app-user-search-dialog',
  templateUrl: './user-search-dialog.component.html'
})
export class UserSearchDialogComponent implements OnInit {

  form: FormGroup;
  formValue: any;
  model: UserSearch;
  statusOptions = USER_STATUS;
  callback: Function | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private mediaService: MediaObserver,
    @Inject(MAT_DIALOG_DATA) data: any,
    @Inject(TIME_RANGE_SEPARATOR) private timeRangeSeparator: string
  ) {
    this.model = data.model;
    this.callback = data.callback;
  }

  ngOnInit(): void {
    const [
      createTimeStart,
      createTimeEnd
    ]: string[] = splitTimeRange(this.model.createTimeRange, this.timeRangeSeparator);

    this.form = this.formBuilder.group({
      username: this.model.username,
      email: this.model.email,
      status: this.model.status,
      createTimeStart: moment(createTimeStart).isValid() ? moment(createTimeStart) : '',
      createTimeEnd: moment(createTimeEnd).isValid() ? moment(createTimeEnd) : ''
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
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

  get createTimeStart(): AbstractControl {
    return this.form.get('createTimeStart');
  }

  get createTimeEnd(): AbstractControl {
    return this.form.get('createTimeEnd');
  }

  get touchUi(): boolean {
    return this.mediaService.isActive('xs');
  }

  get modelMerged(): UserSearch {
    const formValue = this.formValue;
    if (formValue) {
      const createTimeRange = concatTimesFormatByISOString(
        formValue.createTimeStart,
        formValue.createTimeEnd,
        this.timeRangeSeparator
      );
      return {
        ...this.model,
        username: formValue.username,
        email: formValue.email,
        status: formValue.status,
        createTimeRange: createTimeRange === this.timeRangeSeparator ? '' : createTimeRange
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
