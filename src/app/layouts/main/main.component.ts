import { Component, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs/Rx';

import { LOGIN_URL } from 'app/common';
import { User } from 'app/models';
import { AuthStore } from 'app/stores';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class MainComponent implements OnDestroy {

  name = environment.appName;
  title: string;
  primaryNav = true;
  user: User;
  childComponent: any;

  titleSubscription: Subscription;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authStore: AuthStore,
    @Inject(LOGIN_URL) private loginUrl: string
  ) {
    this.titleSubscription = router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => route.firstChild)
      .filter((childRoute) => childRoute !== null)
      .do((childRoute) => {
        this.childComponent = childRoute.component;
      })
      .switchMap((childRoute) => childRoute.data)
      .subscribe((data: Data) => {
        this.title = data.title;
      });
    this.userSubscription = authStore.user
      .filter((model) => model !== null)
      .subscribe((model: User) => {
        this.user = model;
      });
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  switchNav(): void {
    this.primaryNav = !this.primaryNav;
  }

  logout(): void {
    this.authStore.logout();
    this.router.navigateByUrl(this.loginUrl);
  }
}
