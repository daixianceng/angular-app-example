import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { Subscription } from 'rxjs/Rx';

import { objectIsEmpty, SCENARIO_CREATE, SCENARIO_UPDATE } from 'app/common';
import { UserStore } from 'app/stores';
import { User, UserSearch, DatatablePage } from 'app/models';
import { UserSearchDialogComponent } from './user-search-dialog.component';
import { UserFormDialogComponent } from './user-form-dialog.component';
import { UserDeletionDialogComponent } from './user-deletion-dialog.component';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  loading: boolean;
  rows: User[];
  page: DatatablePage;
  sorts: SortPropDir[];
  searchModel: UserSearch;
  currModel: User | null = null;

  loadingSubscription: Subscription;
  rowsSubscription: Subscription;
  pageSubscription: Subscription;
  sortsSubscription: Subscription;
  searchModelSubscription: Subscription;

  constructor(
    private userStore: UserStore,
    private dialog: MatDialog
  ) {
    this.loadingSubscription = userStore.loading.subscribe((value) => {
      this.loading = value;
    });
    this.rowsSubscription = userStore.items.subscribe((value) => {
      this.rows = value;
    });
    this.pageSubscription = userStore.page.subscribe((value) => {
      this.page = value;
    });
    this.sortsSubscription = userStore.sorts.subscribe((value) => {
      this.sorts = value;
    });
    this.searchModelSubscription = userStore.search.subscribe((value) => {
      this.searchModel = value;
    });
  }

  ngOnInit(): void {
    this.userStore.fetchData();
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

  openMenu(model: User): void {
    this.currModel = model;
  }

  setPage(page: DatatablePage): void {
    this.userStore.page.next(page);
    this.userStore.fetchData();
  }

  setSorts(sorts: SortPropDir[]): void {

    /**
     * `DataTableComponent` sets offset to 0 in `onColumnSort` method when sort is applied.
     * @see https://github.com/swimlane/ngx-datatable/issues/765
     */
    const page = { ...this.page } as DatatablePage;
    page.offset = 0;
    this.userStore.page.next(page);

    this.userStore.sorts.next(sorts);
    this.userStore.fetchData();
  }

  search(): void {
    const dialogRef = this.openSearchDialog({
      model: this.searchModel,
      callback: (model: UserSearch): void => {
        this.userStore.search.next(model);
        this.userStore.fetchData();
        dialogRef.close();
      }
    });
  }

  createUser(): void {
    const dialogRef = this.openFormDialog({
      title: 'Create User',
      model: new User(),
      scenario: SCENARIO_CREATE,
      callback: (): void => {
        this.userStore.fetchData();
        dialogRef.close();
      }
    });
  }

  viewUser(model: User): void {
    this.openFormDialog({
      title: 'View User',
      model
    });
  }

  updateUser(model: User): void {
    const dialogRef = this.openFormDialog({
      title: 'Update User',
      model,
      scenario: SCENARIO_UPDATE,
      callback: (): void => {
        this.userStore.fetchData();
        dialogRef.close();
      }
    });
  }

  deleteUser(model: User): void {
    const dialogRef = this.openDeletionDialog({
      model,
      callback: (): void => {
        this.userStore.fetchData();
        dialogRef.close();
      }
    });
  }

  openFormDialog(data: any): MatDialogRef<UserFormDialogComponent> {
    return this.dialog.open(UserFormDialogComponent, { data });
  }

  openDeletionDialog(data: any): MatDialogRef<UserDeletionDialogComponent> {
    return this.dialog.open(UserDeletionDialogComponent, { data });
  }

  openSearchDialog(data: any): MatDialogRef<UserSearchDialogComponent> {
    return this.dialog.open(UserSearchDialogComponent, { data });
  }
}
