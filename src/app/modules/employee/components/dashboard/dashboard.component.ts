import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, NgFor, MatDivider, MatMenu, MatIcon, MatMenuTrigger],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  listOFTasks: any = [];

  constructor(
    private empService: EmployeeService,
    private snackBar: MatSnackBar
  ) {
    this.getEmployeeTasks();
  }

  getEmployeeTasks() {
    this.empService.getEmployeeTasksById().subscribe((res) => {
      console.log(res);
      this.listOFTasks = res;
    });
  }

  updateStatus(id: number, status: string) {
    this.empService.updateStatus(id, status).subscribe((res) => {
      if (res.id != null) {
        this.snackBar.open('Status updated successfully!', 'Close', {
          duration: 2000,
        });
        this.getEmployeeTasks();
      } else {
        this.snackBar.open('Error while updating task', 'Close', {
          duration: 2000,
        });
      }
    });
  }
}
