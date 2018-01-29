import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { User } from 'app/models';
import { AuthStore } from 'app/stores/auth.store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * Cyclic dependency error with HttpInterceptor
     * @see https://github.com/angular/angular/issues/18224#issuecomment-329939990
     */
    const user: User | null = this.injector.get(AuthStore).user.value;

    let reqDup = req;
    if (user) {
      reqDup = req.clone({
        setHeaders: { Authorization: 'Bearer ' + user.accessToken }
      });
    }
    return next.handle(reqDup);
  }
}
