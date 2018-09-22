import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { convertModelToFormData } from 'app/common';
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

  post(model: Post, file: File | undefined): Observable<any> {
    const url = `${environment.apiBaseUrl}v1/post`;
    if (file) {
      const formData: FormData = convertModelToFormData(model, 'Post');
      formData.append('file', file);
      return this.httpClient.post(url, formData);
    } else {
      return this.httpClient.post(url, { Post: model });
    }
  }

  put(model: Post, file: File | false | undefined): Observable<any> {
    const url = `${environment.apiBaseUrl}v1/post/${model.id}`;
    if (file) {
      const formData: FormData = convertModelToFormData(model, 'Post');
      formData.append('file', file);
      return this.httpClient.post(url, formData);
    } else if (file === false) {
      return this.httpClient.put(url, { Post: model, removeCover: true });
    } else {
      return this.httpClient.put(url, { Post: model });
    }
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}v1/post/${id}`);
  }
}
