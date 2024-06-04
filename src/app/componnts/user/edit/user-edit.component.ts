import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DeleteBtnComponent } from '../../UI/custom-btn.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { Action, Store } from '@ngrx/store';
import {
  selectUserEditState,
  selectUserFullName,
  selectUserId,
  selectUserRole,
} from '../../../store/user/user.selectors';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  attemptToBlockUser,
  deleteUser,
  setPassword,
  submitUserRole,
} from '../../../store/user/user.actions';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DndDirective } from '../../helpers/dnd.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { notNull, readFile } from '../../helpers/helpers';
import {
  CitizienShip,
  FileData,
  Permission,
  Role,
  roles,
} from '../user.models';
import { MatExpansionModule } from '@angular/material/expansion';
import { filter } from 'rxjs';

interface ActionCustomBtn {
  type: 'action';
  color: string;
  name: string;
  action: (prop: string) => Action;
}
interface SubmitCustomBtn {
  type: 'submit';
  color: string;
  name: string;
}

type CustomBtn = ActionCustomBtn | SubmitCustomBtn;

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    DeleteBtnComponent,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    DndDirective,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  templateUrl: './user-edit.component.html',
  styles: [
    `
      .test {
        background-color: var(--button-color);
      }
    `,
  ],
})
export class EditUserComponent {
  protected readonly routeUrl = signal<string>('');

  readonly rolesList = roles;

  readonly userRole = toSignal(this.store.select(selectUserRole));
  readonly userName = toSignal(this.store.select(selectUserFullName));
  readonly userId = toSignal(this.store.select(selectUserId));

  readonly citizenshipOptions = EditUserHelper.citizenshipOptions;

  readonly customButtonsInternal = EditUserHelper.customButtonsInternal;

  socialMedia = EditUserHelper.socialMedia;
  private readonly permissionItems = EditUserHelper.permissionItems;

  public userFormGroup = this.fb.group({
    role: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    citizienShip: [[''], Validators.required],
    instagram: [''],
    email: [''],
    tweeter: [''],
    facebook: [''],
    files: this.fb.array<FileData>([]),
    permissions: this.fb.array(
      this.permissionItems.map((p) => {
        return this.fb.group({
          title: [p],
          create: [false],
          read: [false],
          update: [false],
          delete: [false],
        });
      })
    ),
  });

  protected handleUserRole(role: Role) {
    this.store.dispatch(submitUserRole({ role }));
  }

  get permissions(): Permission[] {
    const permissions = this.userFormGroup.get('permissions') as FormArray;
    return permissions.controls.map((c) => c.value);
  }

  get filesControls(): FileData[] {
    const files = this.userFormGroup.get('files') as FormArray;
    return files.controls.map((c) => c.value);
  }

  private addFileControl(fileData: FileData): void {
    const filesArray = this.userFormGroup.get('files') as FormArray;
    filesArray.push(this.createFileControl(fileData));
  }

  private createFileControl(fileData: FileData): FormGroup {
    return this.fb.group({
      name: [fileData.name],
      size: [fileData.size],
      contentUrl: [fileData.contentUrl],
    });
  }

  protected async handleFileBrowse(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const fileList = Object.values(files);
      fileList.forEach(async (f) => await this.addFile(f));
    }
  }

  protected onFileDrop(files: FileList) {
    const fileList = Object.values(files);
    fileList.forEach(async (f) => await this.addFile(f));
  }

  private async addFile(f: File) {
    const file: FileData = {
      name: f.name,
      size: f.size,
      contentUrl: await readFile(f),
    };
    this.addFileControl(file);
  }

  protected deleteFile(e: Event, index: number) {
    e.stopPropagation();
    const filesArray = this.userFormGroup.get('files') as FormArray;
    if (index >= 0 && index < filesArray.length) {
      filesArray.removeAt(index);
    }
  }

  @HostBinding('class.h-full')
  @HostBinding('class.flex')
  get adjustHeightAndDisplay() {
    return true;
  }

  constructor(
    route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.routeUrl.set(route.snapshot.url[0].path);
    // patch form fields after rerouting
    this.store
      .select(selectUserEditState)
      .pipe(filter(notNull), takeUntilDestroyed())
      .subscribe((state) => {
        this.userFormGroup.patchValue({
          ...state,
        });
      });
  }
}

class EditUserHelper {
  static readonly citizenshipOptions: CitizienShip[] = [
    { id: 'USA', name: 'United States of America' },
    { id: 'CANADA', name: 'Canada' },
    { id: 'UK', name: 'United Kingdom' },
    { id: 'AUSTRALIA', name: 'Australia' },
    { id: 'INDIA', name: 'India' },
  ];

  static readonly customButtonsInternal: CustomBtn[] = [
    {
      type: 'action',
      color: '#E5322C',
      name: 'delete',
      action: (id) => deleteUser({ id }),
    },
    {
      type: 'action',
      color: '#FABB2B',
      name: 'block',
      action: (id) => attemptToBlockUser({ id }),
    },
    {
      type: 'action',
      color: '#6E7C98',
      name: 'set password',
      action: (id) => setPassword({ id }),
    },
    {
      type: 'submit',
      color: '#5E92FC',
      name: 'save',
    },
  ];

  static socialMedia = ['instagram', 'email', 'tweeter', 'facebook'] as const;
  static permissionItems = ['Script', 'Props', 'Screens', 'Money', 'Stunt'];
}
