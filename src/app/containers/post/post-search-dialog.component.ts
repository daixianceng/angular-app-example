import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ObservableMedia } from '@angular/flex-layout';
import { MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

import { splitTimeRange, concatTimesFormatByISOString, TIME_RANGE_SEPARATOR } from 'app/common';
import { CategoryStore } from 'app/stores';
import { Category, PostSearch, POST_STATUS } from 'app/models';

@Component({
  selector: 'app-post-search-dialog',
  templateUrl: './post-search-dialog.component.html'
})
export class PostSearchDialogComponent implements OnInit {

  form: FormGroup;
  formValue: any;
  model: PostSearch;
  statusOptions = POST_STATUS;
  callback: Function | undefined;
  categories: Category[];

  constructor(
    private categoryStore: CategoryStore,
    private formBuilder: FormBuilder,
    private mediaService: ObservableMedia,
    @Inject(MAT_DIALOG_DATA) data: any,
    @Inject(TIME_RANGE_SEPARATOR) private timeRangeSeparator: string
  ) {
    categoryStore.all.subscribe((value) => {
      this.categories = value;
    });
    this.model = data.model;
    this.callback = data.callback;
  }

  ngOnInit(): void {
    const [
      createTimeStart,
      createTimeEnd
    ]: string[] = splitTimeRange(this.model.createTimeRange, this.timeRangeSeparator);

    this.form = this.formBuilder.group({
      title: this.model.title,
      categoryId: this.model.categoryId,
      status: this.model.status,
      createTimeStart: moment(createTimeStart).isValid() ? moment(createTimeStart) : '',
      createTimeEnd: moment(createTimeEnd).isValid() ? moment(createTimeEnd) : ''
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
  }

  get touchUi(): boolean {
    return this.mediaService.isActive('xs');
  }

  get modelMerged(): PostSearch {
    const formValue = this.formValue;
    if (formValue) {
      const createTimeRange = concatTimesFormatByISOString(
        formValue.createTimeStart,
        formValue.createTimeEnd,
        this.timeRangeSeparator
      );
      return {
        ...this.model,
        title: formValue.title,
        categoryId: formValue.categoryId,
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
