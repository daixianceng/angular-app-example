import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { environment } from 'environments/environment';

@Injectable()
export class CalculationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  dailyPosts(params: HttpParams | null = null): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}v1/calculation/daily-posts`, { params });
  }
}
