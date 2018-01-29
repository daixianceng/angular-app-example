import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserComponent } from './user.component';
import { UserFormDialogComponent } from './user-form-dialog.component';
import { UserDeletionDialogComponent } from './user-deletion-dialog.component';
import { UserSearchDialogComponent } from './user-search-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatMomentDateModule
  ],
  declarations: [
    UserComponent,
    UserFormDialogComponent,
    UserDeletionDialogComponent,
    UserSearchDialogComponent
  ],
  entryComponents: [
    UserFormDialogComponent,
    UserDeletionDialogComponent,
    UserSearchDialogComponent
  ],
})
export class UserModule { }
