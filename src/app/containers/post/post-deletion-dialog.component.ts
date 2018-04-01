import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { dataIsSuccess } from 'app/common';
import { PostStore } from 'app/stores';
import { Post, ResponseData } from 'app/models';

@Component({
  selector: 'app-post-deletion-dialog',
  templateUrl: './post-deletion-dialog.component.html'
})
export class PostDeletionDialogComponent {

  model: Post;
  callback: Function | undefined;

  constructor(
    private postStore: PostStore,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.model = data.model;
    this.callback = data.callback;
  }

  submit(e: Event): void {
    this.postStore.delete(this.model).subscribe((data: ResponseData) => {
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
