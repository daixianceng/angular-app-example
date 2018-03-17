import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { User } from 'app/models';
import { environment } from 'environments/environment';

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(params: HttpParams | null = null): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/users`, { params });
  }

  get(id: number | string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/user/${id}`);
  }

  post(model: User): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}v1/user`, { User: model });
  }

  put(model: User): Observable<any> {
    return this.httpClient.put(`${environment.apiBaseUrl}v1/user/${model.id}`, { User: model });
  }

  delete(id: number | string): Observable<any> {
    return this.httpClient.delete(`${environment.apiBaseUrl}v1/user/${id}`);
  }

  postAvatar(id: number | string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${environment.apiBaseUrl}v1/user/${id}/avatar`, formData);
  }
}
