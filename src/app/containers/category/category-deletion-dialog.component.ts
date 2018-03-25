import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { dataIsSuccess } from 'app/common';
import { CategoryStore } from 'app/stores';
import { Category, ResponseData } from 'app/models';

@Component({
  selector: 'app-category-deletion-dialog',
  templateUrl: './category-deletion-dialog.component.html'
})
export class CategoryDeletionDialogComponent {

  model: Category;
  callback: Function | undefined;

  constructor(
    private categoryStore: CategoryStore,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.callback = data.callback;
  }

  submit(e: Event): void {
    this.categoryStore.delete(this.model).subscribe((data: ResponseData) => {
      if (dataIsSuccess(data)) {
        this.handleSuccess();
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
