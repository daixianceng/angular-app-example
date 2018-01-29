import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';

import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name = environment.appName;
  title: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route.firstChild)
      .filter((childRoute) => childRoute !== null)
      .switchMap((childRoute) => childRoute.data)
      .filter((data) => !!data)
      .subscribe((data: Data) => {
        this.title = data.title;
      });
  }
}
