import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatChipsModule,
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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { PostComponent } from './post.component';
import { PostWritingComponent } from './post-writing.component';
import { PostWritingTagDialogComponent } from './post-writing-tag-dialog.component';
import { PostDeletionDialogComponent } from './post-deletion-dialog.component';
import { PostSearchDialogComponent } from './post-search-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule,
    MatButtonModule,
    MatChipsModule,
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
    PostComponent,
    PostWritingComponent,
    PostWritingTagDialogComponent,
    PostDeletionDialogComponent,
    PostSearchDialogComponent
  ],
  entryComponents: [
    PostWritingTagDialogComponent,
    PostDeletionDialogComponent,
    PostSearchDialogComponent
  ],
})
export class PostModule { }
