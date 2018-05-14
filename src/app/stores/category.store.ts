import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';

import { convertSortToString, convertPaginationToDatatablePage } from 'app/common';
import { Category, CategorySearch, Pagination, DatatablePage } from 'app/models';
import { CategoryService } from 'app/services/category.service';

@Injectable()
export class CategoryStore {

  readonly loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly items: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  readonly page: BehaviorSubject<DatatablePage>;
  readonly sorts: BehaviorSubject<SortPropDir[]> = new BehaviorSubject([]);
  readonly search: BehaviorSubject<CategorySearch> = new BehaviorSubject(new CategorySearch());
  readonly all: BehaviorSubject<Category[]> = new BehaviorSubject([]);

  constructor(
    private categoryService: CategoryService,
  ) {
    const page = new DatatablePage();
    page.count = 0;
    page.pageSize = 10;
    page.limit = page.pageSize;
    page.offset = 0;
    this.page = new BehaviorSubject(page);
  }

  fetchAll(): Subscription {
    const params = (new HttpParams()).set(
      'per-page',
      String(Number.MAX_SAFE_INTEGER)
    );
    return this.categoryService.getAll(params).subscribe((res: any) => {
      this.all.next(res.data.items as Category[]);
    });
  }

  findById(id: string): Category | undefined {
    return this.all.value.find((item: Category) => item.id === id);
  }

  fetchData(params: HttpParams = this.buildHttpParams()): Subscription {
    this.loading.next(true);
    return this.categoryService.getAll(params).finally(() => {
      this.loading.next(false);
    }).subscribe((res: any) => {
      this.items.next(res.data.items as Category[]);
      this.page.next(convertPaginationToDatatablePage(res.data._meta as Pagination));
    });
  }

  buildHttpParams(): HttpParams {
    const page: number = this.page.value.offset + 1;
    const perPage: number = this.page.value.limit;
    const sort: SortPropDir | undefined = this.sorts.value[0];
    const searchModel: CategorySearch = this.search.value;

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
        params = params.set(`CategorySearch[${key}]`, String(value));
      }
    });

    return params;
  }

  create(model: Category): Observable<any> {
    return this.categoryService.post(model);
  }

  update(model: Category): Observable<any> {
    return this.categoryService.put(model);
  }

  delete(model: Category): Observable<any> {
    return this.categoryService.delete(model.id);
  }
}
