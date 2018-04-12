import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { Post } from 'app/models';
import { environment } from 'environments/environment';

@Injectable()
export class PostService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(params: HttpParams | null = null): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/posts`, { params });
  }

  getTags(): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/post-tags`);
  }

  get(id: number | string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/post/${id}`);
  }

  post(model: Post): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}v1/post`, { Post: model });
  }

  put(model: Post): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}v1/post/${model.id}`, { Post: model });
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}v1/post/${id}`);
  }
}
