import { CommonModule, FormatWidth } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DeleteBtnComponent } from '../../UI/custom-btn.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import {
  selectUserFullName,
  selectUserRole,
} from '../../../store/user/user.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { submitUserRole } from '../../../store/user/user.actions';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { DndDirective } from '../../helpers/dnd.directive';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { readFile } from '../../helpers/helpers';
import { Role, roles } from '../user.models';

export interface FileData {
  contentUrl: string;
  name: string;
  size: number;
}

interface CitizienShip {
  id: string;
  name: string;
}

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

  roles = new FormControl('');
  readonly rolesList = roles;

  readonly userRole = toSignal(this.store.select(selectUserRole));
  readonly userName = toSignal(this.store.select(selectUserFullName));

  readonly citizenshipOptions: CitizienShip[] = [
    { id: 'USA', name: 'United States of America' },
    { id: 'CANADA', name: 'Canada' },
    { id: 'UK', name: 'United Kingdom' },
    { id: 'AUSTRALIA', name: 'Australia' },
    { id: 'INDIA', name: 'India' },
  ];

  readonly socialMedia = ['instagram', 'email', 'tweeter', 'facebook'];

  public linksFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthDate: ['', Validators.required],
    citizienShip: ['', Validators.required],
    instagram: [''],
    email: [''],
    tweeter: [''],
    facebook: [''],
    files: this.fb.array([]),
  });

  protected handleUserRole(role: Role) {
    this.store.dispatch(submitUserRole({ role }));
  }

  get getFiles(): FileData[] {
    const files = this.linksFormGroup.get('files') as FormArray;
    return files.controls.map((c) => c.value);
  }

  private addFileControl(fileData: FileData): void {
    const filesArray = this.linksFormGroup.get('files') as FormArray;
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
    const filesArray = this.linksFormGroup.get('files') as FormArray;
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
  }
}
