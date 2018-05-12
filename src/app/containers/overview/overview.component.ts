import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { CalculationStore } from 'app/stores';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  dailyPostsLoading: boolean;
  dailyPostsResults: Object[];

  readonly loadingSubscription: Subscription;
  readonly dailyPostsSubscription: Subscription;

  constructor(
    private calculationStore: CalculationStore
  ) {
    this.loadingSubscription = calculationStore.dailyPostsLoading.subscribe((value) => {
      this.dailyPostsLoading = value;
    });
    this.dailyPostsSubscription = calculationStore.dailyPosts.subscribe((value) => {
      this.dailyPostsResults = [
        {
          name: 'Posts',
          series: value
        }
      ];
    });
  }

  ngOnInit() {
    this.calculationStore.fetchDailyPosts();
  }

  ngOnDestroy(): void {
    this.loadingSubscription
      .add(this.dailyPostsSubscription)
      .unsubscribe();
  }
}
