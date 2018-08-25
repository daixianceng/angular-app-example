import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs/Rx';
import { uniq } from 'lodash';

import { CanComponentDeactivate, dataIsSuccess, SCENARIO_CREATE, SCENARIO_UPDATE } from 'app/common';
import { PostService } from 'app/services';
import { CategoryStore, PostStore } from 'app/stores';
import { Category, Post, PostTags, POST_STATUS, ErrorMessage, ResponseData } from 'app/models';
import { PostWritingTagDialogComponent } from './post-writing-tag-dialog.component';

@Component({
  templateUrl: './post-writing.component.html',
  styleUrls: ['./post-writing.component.scss']
})
export class PostWritingComponent implements OnInit, CanComponentDeactivate {

  scenario: string;
  form: FormGroup;
  formValue: any;
  model: Post;
  statusOptions = POST_STATUS;
  categories: BehaviorSubject<Category[]>;
  tags: BehaviorSubject<PostTags>;
  newTags: string[] = [];
  coverSrc: string | undefined;
  coverFile: File | undefined;
  coverTooSmall = false;
  coverTooLarge = false;
  coverIsRequired = false;
  submitted = false;
  editorOptions: Object = {
    heightMax: 1000,
    heightMin: 200,
    placeholderText: 'Content here...'
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private categoryStore: CategoryStore,
    private postService: PostService,
    private postStore: PostStore
  ) {
    this.categories = categoryStore.all;
    this.tags = postStore.tags;
  }

  ngOnInit(): void {
    this.categoryStore.fetchAll();
    this.postStore.fetchTags();
    this.form = this.formBuilder.group({
      title: [
        null,
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ],
      key: [
        null,
        [
          Validators.required,
          Validators.maxLength(255)
        ]
      ],
      categoryId: [
        null,
        [
          Validators.required
        ]
      ],
      tagCollection: [
        null,
        [
          Validators.required
        ]
      ],
      status: [
        null,
        [
          Validators.required
        ]
      ],
      intro: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(140)
        ]
      ],
      content: [
        null,
        [
          Validators.required
        ]
      ]
    });
    this.form.valueChanges.forEach((formValue) => {
      this.formValue = formValue;
    });
    this.route.paramMap
      .map((params: ParamMap) => params.get('id'))
      .distinct()
      .filter((id: string | null) => {
        if (id === null) {
          this.scenario = SCENARIO_CREATE;
          this.setModel(new Post());
          return false;
        } else {
          this.scenario = SCENARIO_UPDATE;
          return true;
        }
      })
      .switchMap((id: string) => this.postService.get(id))
      .subscribe((res: any) => {
        this.setModel(res.data as Post);
      }, (errorResp: HttpErrorResponse) => {
        if (errorResp.status === 404) {
          this.router.navigate(['not-found']);
        }
      });
  }

  canDeactivate(): boolean {
    return this.form.dirty && !this.submitted ? confirm('Leave the current page?') : true;
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get key(): AbstractControl {
    return this.form.get('key');
  }

  get categoryId(): AbstractControl {
    return this.form.get('categoryId');
  }

  get tagCollection(): AbstractControl {
    return this.form.get('tagCollection');
  }

  get status(): AbstractControl {
    return this.form.get('status');
  }

  get intro(): AbstractControl {
    return this.form.get('intro');
  }

  get content(): AbstractControl {
    return this.form.get('content');
  }

  get modelMerged(): Post {
    return {
      ...this.model,
      ...this.formValue
    };
  }

  get tagsUniq(): string[] {
    return uniq(this.tags.value.concat(this.newTags));
  }

  get hasCover(): boolean {
    return Boolean(this.coverSrc || (this.model && this.model.coverURL));
  }

  get hasCoverError(): boolean {
    return this.coverTooSmall || this.coverTooLarge || (this.scenario === SCENARIO_CREATE && !this.coverFile);
  }

  setModel(model): void {
    this.model = model;
    this.form.patchValue(model);
  }

  selectCover(files: FileList): void {
    const file: File | undefined = files[0];
    this.coverFile = file;

    if (file) {
      const reader = new FileReader();

      /**
       * Is there a better solution?
       * @see https://github.com/Microsoft/TypeScript/issues/299#issuecomment-168538829
       */
      reader.onload = (e: Event) => {
        this.coverSrc = e.target['result'];
      };
      reader.readAsDataURL(file);
      this.coverTooSmall = file.size < 1024 * 10;
      this.coverTooLarge = file.size > 1024 * 1000;
      this.coverIsRequired = false;
    } else {
      this.coverSrc = undefined;
      this.coverTooSmall = false;
      this.coverTooLarge = false;
      if (this.scenario === SCENARIO_CREATE) {
        this.coverIsRequired = true;
      }
    }
  }

  submit(e: Event): void {
    (() => {
      if (this.scenario === SCENARIO_CREATE) {
        return this.postStore.create(this.modelMerged, this.coverFile);
      } else {
        return this.postStore.update(this.modelMerged, this.coverFile);
      }
    })().subscribe((data: ResponseData) => {
      if (dataIsSuccess(data)) {
        this.submitted = true;
        this.router.navigate(['post']);
      }
    }, (errorResp: HttpErrorResponse) => {
      if (errorResp.status === 422) {
        errorResp.error.data.forEach((errorMessage: ErrorMessage) => {
          this.form.get(errorMessage.field).setErrors({
            message: errorMessage.message
          });
        });
      }
    });
    e.preventDefault();
  }

  createTag(): void {
    const dialogRef = this.openTagDialog({
      callback: (value: string): void => {
        this.newTags.push(value);
        dialogRef.close();
      }
    });
  }

  openTagDialog(data: any): MatDialogRef<PostWritingTagDialogComponent> {
    return this.dialog.open(PostWritingTagDialogComponent, { data });
  }
}
