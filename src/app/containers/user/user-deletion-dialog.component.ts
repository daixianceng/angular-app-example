import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { dataIsSuccess } from 'app/common';
import { UserStore } from 'app/stores';
import { User, ResponseData } from 'app/models';

@Component({
  selector: 'app-user-deletion-dialog',
  templateUrl: './user-deletion-dialog.component.html'
})
export class UserDeletionDialogComponent {

  model: User;
  callback: Function | undefined;

  constructor(
    private userStore: UserStore,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.callback = data.callback;
  }

  submit(e: Event): void {
    this.userStore.delete(this.model).subscribe((data: ResponseData) => {
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
