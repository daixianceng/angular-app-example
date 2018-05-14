import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';

import { convertSortToString, convertPaginationToDatatablePage } from 'app/common';
import { User, UserSearch, Pagination, DatatablePage } from 'app/models';
import { UserService } from 'app/services/user.service';

@Injectable()
export class UserStore {

  readonly loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly items: BehaviorSubject<User[]> = new BehaviorSubject([]);
  readonly page: BehaviorSubject<DatatablePage>;
  readonly sorts: BehaviorSubject<SortPropDir[]> = new BehaviorSubject([]);
  readonly search: BehaviorSubject<UserSearch> = new BehaviorSubject(new UserSearch());

  constructor(
    private userService: UserService,
  ) {
    const page = new DatatablePage();
    page.count = 0;
    page.pageSize = 10;
    page.limit = page.pageSize;
    page.offset = 0;
    this.page = new BehaviorSubject(page);
  }

  fetchData(params: HttpParams = this.buildHttpParams()): Subscription {
    this.loading.next(true);
    return this.userService.getAll(params).finally(() => {
      this.loading.next(false);
    }).subscribe((res: any) => {
      this.items.next(res.data.items as User[]);
      this.page.next(convertPaginationToDatatablePage(res.data._meta as Pagination));
    });
  }

  buildHttpParams(): HttpParams {
    const page: number = this.page.value.offset + 1;
    const perPage: number = this.page.value.limit;
    const sort: SortPropDir | undefined = this.sorts.value[0];
    const searchModel: UserSearch = this.search.value;

    let params = new HttpParams();

    params = params
      .set('page', String(page))
      .set('per-page', String(perPage));

    if (sort) {
      params = params.set('sort', convertSortToString(sort));
    }

    Object.keys(searchModel).forEach((key: string) => {
      const value = searchModel[key];
      if (value) {
        params = params.set(`UserSearch[${key}]`, String(value));
      }
    });

    return params;
  }

  create(model: User): Observable<any> {
    return this.userService.post(model);
  }

  update(model: User): Observable<any> {
    return this.userService.put(model);
  }

  updateAvatar(model: User, file: File): Observable<any> {
    return this.userService.postAvatar(model.id, file);
  }

  delete(model: User): Observable<any> {
    return this.userService.delete(model.id);
  }
}
