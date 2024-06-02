import { CommonModule } from '@angular/common';
import { Component, HostBinding, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { DeleteBtnComponent } from '../../UI/custom-btn.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { Role, roles } from '../../../store/user/user.reducer';
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

  readonly citizenshipOptions: any[] = [
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
  });

  handleUserRole(role: Role) {
    this.store.dispatch(submitUserRole({ role }));
  }

  //   fg = this.fb.group({
  //     email: ['', []],
  //   });

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
    console.log(this.linksFormGroup.value);
    this.routeUrl.set(route.snapshot.url[0].path);
  }
}
