import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
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

  constructor(
    private adminService: AdminService,
    private matSnackBar: MatSnackBar
  ) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.adminService.getAllTasks().subscribe((res) => {
      this.listOfTasks = res;
      console.log(this.listOfTasks);
    });
  }

  deleteTask(id: number) {
    this.adminService.deleteTask(id).subscribe((res) => {
      this.matSnackBar.open('Task has deleted', 'Close', { duration: 2000 });
      this.getAllTasks();
    });
  }
}
