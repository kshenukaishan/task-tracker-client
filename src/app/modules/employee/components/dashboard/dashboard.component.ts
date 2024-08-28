import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatCard } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, NgFor, MatDivider],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  listOFTasks: any = [];

  constructor(private empService: EmployeeService) {
    this.getEmployeeTasks();
  }

  getEmployeeTasks() {
    this.empService.getEmployeeTasksById().subscribe((res) => {
      console.log(res);
      this.listOFTasks = res;
    });
  }
}
