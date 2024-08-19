import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatLabel,
    MatDivider,
    NgFor,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  listOfTasks: any = [];
  searchForm!: FormGroup;

  constructor(
    private adminService: AdminService,
    private matSnackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.getAllTasks();
    this.searchForm = this.formBuilder.group({
      title: [null],
    });
  }

  getAllTasks() {
    this.adminService.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
    });
  }

  deleteTask(id: number) {
    this.adminService.deleteTask(id).subscribe((res) => {
      this.matSnackBar.open('Task has deleted', 'Close', { duration: 2000 });
      this.getAllTasks();
    });
  }

  searchTask() {
    this.listOfTasks = [];
    const title = this.searchForm.get('title')?.value;
    this.adminService.saerchTask(title).subscribe((res) => {
      this.listOfTasks = res;
    });
  }
}
