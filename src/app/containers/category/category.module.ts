import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CategoryComponent } from './category.component';
import { CategoryFormDialogComponent } from './category-form-dialog.component';
import { CategoryDeletionDialogComponent } from './category-deletion-dialog.component';
import { CategorySearchDialogComponent } from './category-search-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule
  ],
  declarations: [
    CategoryComponent,
    CategoryFormDialogComponent,
    CategoryDeletionDialogComponent,
    CategorySearchDialogComponent
  ],
  entryComponents: [
    CategoryFormDialogComponent,
    CategoryDeletionDialogComponent,
    CategorySearchDialogComponent
  ],
})
export class CategoryModule { }
