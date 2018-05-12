import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

import { convertObjectToItems, concatTimesFormatByISOString, TIME_RANGE_SEPARATOR } from 'app/common';
import { Items } from 'app/models';
import { CalculationService } from 'app/services/calculation.service';

@Injectable()
export class CalculationStore {

  readonly dailyPostsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly dailyPosts: BehaviorSubject<Items> = new BehaviorSubject([]);

  constructor(
    private calculationService: CalculationService,
    @Inject(TIME_RANGE_SEPARATOR) private timeRangeSeparator: string
  ) { }

  fetchDailyPosts(params: HttpParams = this.buildHttpParams()): Subscription {
    this.dailyPostsLoading.next(true);
    return this.calculationService.dailyPosts(params).finally(() => {
      this.dailyPostsLoading.next(false);
    }).subscribe((res: any) => {
      this.dailyPosts.next(convertObjectToItems(res.data));
    });
  }

  buildHttpParams(): HttpParams {
    let params = new HttpParams();

    params = params.set('Calculator[timeRange]', concatTimesFormatByISOString(
      moment().subtract(1, 'month').startOf('day'),
      moment(),
      this.timeRangeSeparator
    ));

    return params;
  }
}
