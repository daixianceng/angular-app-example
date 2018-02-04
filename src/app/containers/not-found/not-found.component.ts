import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { StyleService } from 'app/services';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnDestroy {

  constructor(
    private location: Location,
    private styleService: StyleService
  ) {
    styleService.addStyle('notFoundStyle', require('./style.css'));
  }

  ngOnDestroy(): void {
    this.styleService.removeStyle('notFoundStyle');
  }

  back() {
    this.location.back();
  }
}
