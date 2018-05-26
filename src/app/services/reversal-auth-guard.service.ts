import { Injectable, Inject } from '@angular/core';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { HOME_URL } from 'app/common';
import { User } from 'app/models';
import { AuthStore } from 'app/stores/auth.store';

@Injectable()
export class ReversalAuthGuard implements CanActivate, CanActivateChild {

  private readonly user: BehaviorSubject<User | null>;

  constructor(
    private authStore: AuthStore,
    private router: Router,
    @Inject(HOME_URL) private homeUrl: string
  ) {
    this.user = this.authStore.user;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user.value) {
      this.router.navigateByUrl(this.homeUrl);

      return false;
    }
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}
