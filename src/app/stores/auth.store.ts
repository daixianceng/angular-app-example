import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs/Rx';

import { dataIsSuccess, parseJSON } from 'app/common';
import { User, LoginForm, ResponseData } from 'app/models';
import { LoginService } from 'app/services/login.service';

@Injectable()
export class AuthStore {

  readonly user: BehaviorSubject<User | null> = new BehaviorSubject(null);

  redirectUrl: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.rewind();
  }

  private setUserIntoStorage(model: User): void {
    window.sessionStorage.setItem('user', JSON.stringify(model));
  }

  private getUserFromStorage(): User | null {
    const userStr: string = window.sessionStorage.getItem('user');
    return parseJSON(userStr, null);
  }

  private removeUserFromStorage(): void {
    window.sessionStorage.removeItem('user');
  }

  login(model: LoginForm): Observable<any> {
    return this.loginService.post(model).do((data: ResponseData) => {
      if (dataIsSuccess(data)) {
        this.replace(data.data);
      }
    });
  }

  logout(): void {
    this.removeUserFromStorage();
    this.user.next(null);
  }

  replace(model: User): void {
    this.setUserIntoStorage(model);
    this.user.next(model);
  }

  rewind(): void {
    this.user.next(this.getUserFromStorage());
  }

  navigate(): void {
    this.router.navigateByUrl(this.redirectUrl || '/');
  }
}
