import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { LoginForm } from 'app/models';
import { environment } from 'environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  post(model: LoginForm): Observable<any> {
    return this.httpClient.post(`${environment.apiBaseUrl}v1/login`, { LoginForm: model });
  }
}
