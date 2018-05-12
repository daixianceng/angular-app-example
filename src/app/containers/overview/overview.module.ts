import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    NgxChartsModule
  ],
  declarations: [
    OverviewComponent
  ],
  exports: [
    OverviewComponent
  ]
})
export class OverviewModule { }
