import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatLabel,
    MatInput,
    MatError,
    NgIf,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerToggle,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatButtonModule,
  ],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss',
})
export class PostTaskComponent {
  taskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];

  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.getUsers();
    this.taskForm = this.formBuilder.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
      console.log(res);
    });
  }

  postTask() {
    console.log(this.taskForm.value);
    this.adminService.postTask(this.taskForm.value).subscribe((res) => {
      if (res.id != null) {
        this.matSnackBar.open('Task added successfully!', 'Close', {
          duration: 2000,
        });
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.matSnackBar.open('Something wen wrong!', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
