import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgFor, NgIf } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatDatepicker,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatOption,
    MatButtonModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
    NgFor,
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent {
  id: number = this.route.snapshot.params['id'];
  updateTaskForm!: FormGroup;
  listOfEmployees: any = [];
  listOfPriorities: any = ['LOW', 'MEDIUM', 'HIGH'];
  listOfTaskStatus: any = [
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED',
    'DIFFERED',
    'CANCELLED',
  ];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.getTaskById();
    this.getUsers();
    this.updateTaskForm = this.formBuilder.group({
      employeeId: [null, [Validators.required]],
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      priority: [null, [Validators.required]],
      taskStatus: [null, [Validators.required]],
    });
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe((res) => {
      this.updateTaskForm.patchValue(res);
      console.log(res);
    });
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      this.listOfEmployees = res;
      console.log(res);
    });
  }

  updateTask() {
    console.log(this.updateTaskForm.value);
    this.adminService
      .updateTask(this.id, this.updateTaskForm.value)
      .subscribe((res) => {
        if (res.id != null) {
          this.matSnackBar.open('Task updated successfully!', 'Close', {
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
