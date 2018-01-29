import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { OverviewComponent } from './overview.component';

@NgModule({
  imports: [
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
