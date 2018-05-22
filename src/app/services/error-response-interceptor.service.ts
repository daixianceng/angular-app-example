import { Injectable, Inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { isPlainObject, isString } from 'lodash';

import { dataIsSuccess, LOGIN_URL } from 'app/common';
import { AuthStore } from 'app/stores';

@Injectable()
export class ErrorResponseInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authStore: AuthStore,
    @Inject(LOGIN_URL) private loginUrl: string
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.body && !dataIsSuccess(event.body)) {
          this.showMessage(event.body.data && event.body.data.message);
        }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.authStore.logout();
          this.router.navigateByUrl(this.loginUrl);
        } else if (err.status === 422 && err.statusText === 'Data Validation Failed.') {
          // Nothing to do
        } else {
          let message = '';
          if (isString(err.error)) {
            message = err.error;
          } else if (isPlainObject(err.error)) {
            message = err.error.data && err.error.data.message;
          }
          if (!message) {
            message = err.message || err.statusText;
          }
          this.showMessage(message);
        }
      }
    });
  }

  showMessage(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
