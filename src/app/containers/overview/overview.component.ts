import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { CalculationStore } from 'app/stores';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  readonly dailyPostsLoading: BehaviorSubject<boolean>;
  dailyPostsResults: Object[];

  readonly dailyPostsSubscription: Subscription;

  constructor(
    private calculationStore: CalculationStore
  ) {
    this.dailyPostsLoading = calculationStore.dailyPostsLoading;
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
    this.dailyPostsSubscription.unsubscribe();
  }
}
