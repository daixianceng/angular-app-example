import { Injectable, Inject } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { LOGIN_URL } from 'app/common';
import { User } from 'app/models';
import { AuthStore } from 'app/stores/auth.store';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  private user: User | null;

  constructor(
    private authStore: AuthStore,
    private router: Router,
    @Inject(LOGIN_URL) private loginUrl: string
  ) {
    this.authStore.user.subscribe((model: User | null) => {
      this.user = model;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.user) {
      this.authStore.redirectUrl = state.url;
      this.router.navigateByUrl(this.loginUrl);

      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
