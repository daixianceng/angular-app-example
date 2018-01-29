import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material';

import { OrderComponent } from './order.component';

@NgModule({
  imports: [
    MatTabsModule
  ],
  declarations: [
    OrderComponent
  ],
})
export class OrderModule { }
