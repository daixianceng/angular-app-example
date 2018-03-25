import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Category } from 'app/models';
import { environment } from 'environments/environment';

@Injectable()
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(params: HttpParams | null = null): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/categories`, { params });
  }

  get(id: number | string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/category/${id}`);
  }

  post(model: Category): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}v1/category`, { Category: model });
  }

  put(model: Category): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}v1/category/${model.id}`, { Category: model });
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}v1/category/${id}`);
  }
}
