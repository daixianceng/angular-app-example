import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';

import { objectIsEmpty, SCENARIO_CREATE, SCENARIO_UPDATE } from 'app/common';
import { UserStore } from 'app/stores';
import { User, UserSearch, DatatablePage } from 'app/models';
import { UserSearchDialogComponent } from './user-search-dialog.component';
import { UserFormDialogComponent } from './user-form-dialog.component';
import { UserDeletionDialogComponent } from './user-deletion-dialog.component';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  readonly loading: BehaviorSubject<boolean>;
  readonly rows: BehaviorSubject<User[]>;
  readonly page: BehaviorSubject<DatatablePage>;
  readonly sorts: BehaviorSubject<SortPropDir[]>;
  readonly searchModel: BehaviorSubject<UserSearch>;
  currModel: User | null = null;

  constructor(
    private userStore: UserStore,
    private dialog: MatDialog
  ) {
    this.loading = userStore.loading;
    this.rows = userStore.items;
    this.page = userStore.page;
    this.sorts = userStore.sorts;
    this.searchModel = userStore.search;
  }

  ngOnInit(): void {
    this.userStore.fetchData();
  }

  get hasSearch(): boolean {
    return !objectIsEmpty(this.searchModel.value);
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
    const page = { ...this.page.value } as DatatablePage;
    page.offset = 0;
    this.userStore.page.next(page);

    this.userStore.sorts.next(sorts);
    this.userStore.fetchData();
  }

  search(): void {
    const dialogRef = this.openSearchDialog({
      model: this.searchModel.value,
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
