import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatSnackBarModule
} from '@angular/material';

import { MainComponent } from './main.component';

import { NavModule, TitleModule } from 'app/components';
import { OrderModule, OverviewModule, UserModule } from 'app/containers';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FlexLayoutModule,
    // Angular material modules
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSnackBarModule,
    // Common modules
    NavModule,
    TitleModule,
    // Containers
    OrderModule,
    OverviewModule,
    UserModule
  ],
  bootstrap: [MainComponent]
})
export class MainModule { }
