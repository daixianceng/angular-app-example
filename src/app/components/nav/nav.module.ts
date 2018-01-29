import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule, MatListModule } from '@angular/material';

import { NavComponent } from './nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule { }
