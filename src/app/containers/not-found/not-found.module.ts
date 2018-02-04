import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    RouterModule,
    FlexLayoutModule
  ],
  declarations: [
    NotFoundComponent
  ],
})
export class NotFoundModule { }
