import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs/Rx';

import { objectIsEmpty } from 'app/common';
import { CategoryStore, PostStore } from 'app/stores';
import { Category, Post, PostSearch, DatatablePage } from 'app/models';
import { PostSearchDialogComponent } from './post-search-dialog.component';
import { PostDeletionDialogComponent } from './post-deletion-dialog.component';

@Component({
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {

  loading: boolean;
  rows: Post[];
  page: DatatablePage;
  sorts: SortPropDir[];
  searchModel: PostSearch;
  currModel: Post | undefined = undefined;

  loadingSubscription: Subscription;
  rowsSubscription: Subscription;
  pageSubscription: Subscription;
  sortsSubscription: Subscription;
  searchModelSubscription: Subscription;

  constructor(
    private categoryStore: CategoryStore,
    private postStore: PostStore,
    private dialog: MatDialog
  ) {
    this.loadingSubscription = postStore.loading.subscribe((value) => {
      this.loading = value;
    });
    this.rowsSubscription = postStore.items.subscribe((value) => {
      this.rows = value;
    });
    this.pageSubscription = postStore.page.subscribe((value) => {
      this.page = value;
    });
    this.sortsSubscription = postStore.sorts.subscribe((value) => {
      this.sorts = value;
    });
    this.searchModelSubscription = postStore.search.subscribe((value) => {
      this.searchModel = value;
    });
  }

  ngOnInit(): void {
    this.categoryStore.fetchAll();
    this.postStore.fetchData();
  }

  ngOnDestroy(): void {
    this.loadingSubscription
      .add(this.rowsSubscription)
      .add(this.pageSubscription)
      .add(this.sortsSubscription)
      .add(this.searchModelSubscription)
      .unsubscribe();
  }

  get hasSearch(): boolean {
    return !objectIsEmpty(this.searchModel);
  }

  getCategoryLabel(id: string): string {
    const model: Category | undefined = this.categoryStore.findById(id);
    return model ? model.name : id;
  }

  openMenu(model: Post): void {
    this.currModel = model;
  }

  setPage(page: DatatablePage): void {
    this.postStore.page.next(page);
    this.postStore.fetchData();
  }

  setSorts(sorts: SortPropDir[]): void {

    /**
     * `DataTableComponent` sets offset to 0 in `onColumnSort` method when sort is applied.
     * @see https://github.com/swimlane/ngx-datatable/issues/765
     */
    const page = { ...this.page } as DatatablePage;
    page.offset = 0;
    this.postStore.page.next(page);

    this.postStore.sorts.next(sorts);
    this.postStore.fetchData();
  }

  search(): void {
    const dialogRef = this.openSearchDialog({
      model: this.searchModel,
      callback: (model: PostSearch): void => {
        this.postStore.search.next(model);
        this.postStore.fetchData();
        dialogRef.close();
      }
    });
  }

  deletePost(model: Post): void {
    const dialogRef = this.openDeletionDialog({
      model,
      callback: (): void => {
        this.postStore.fetchData();
        dialogRef.close();
      }
    });
  }

  openDeletionDialog(data: any): MatDialogRef<PostDeletionDialogComponent> {
    return this.dialog.open(PostDeletionDialogComponent, { data });
  }

  openSearchDialog(data: any): MatDialogRef<PostSearchDialogComponent> {
    return this.dialog.open(PostSearchDialogComponent, { data });
  }
}
