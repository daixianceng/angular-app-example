import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { SortPropDir } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Observable, Subscription } from 'rxjs/Rx';
import { toPairs } from 'lodash';

import { convertSortToString, convertPaginationToDatatablePage } from 'app/common';
import { Post, PostSearch, Pagination, DatatablePage } from 'app/models';
import { PostService } from 'app/services/post.service';

@Injectable()
export class PostStore {

  readonly loading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly items: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  readonly page: BehaviorSubject<DatatablePage>;
  readonly sorts: BehaviorSubject<SortPropDir[]> = new BehaviorSubject([]);
  readonly search: BehaviorSubject<PostSearch> = new BehaviorSubject(new PostSearch());

  constructor(
    private postService: PostService,
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
    return this.postService.getAll(params).finally(() => {
      this.loading.next(false);
    }).subscribe((res: any) => {
      this.items.next(res.data.items as Post[]);
      this.page.next(convertPaginationToDatatablePage(res.data._meta as Pagination));
    });
  }

  buildHttpParams(): HttpParams {
    const page: number = this.page.value.offset + 1;
    const perPage: number = this.page.value.limit;
    const sort: SortPropDir | undefined = this.sorts.value[0];
    const searchModel: PostSearch = this.search.value;

    let params = new HttpParams();

    params = params
      .set('page', String(page))
      .set('per-page', String(perPage));

    if (sort) {
      params = params.set('sort', convertSortToString(sort));
    }

    toPairs(searchModel).forEach(([key, value]) => {
      if (value) {
        params = params.set(`PostSearch[${key}]`, String(value));
      }
    });

    return params;
  }

  create(model: Post): Observable<any> {
    return this.postService.post(model);
  }

  update(model: Post): Observable<any> {
    return this.postService.put(model);
  }

  delete(model: Post): Observable<any> {
    return this.postService.delete(model.id);
  }
}
