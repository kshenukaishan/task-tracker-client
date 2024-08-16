import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss',
})
export class UpdateTaskComponent {
  id: number = this.route.snapshot.params['id'];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.getTaskById();
  }

  getTaskById() {
    this.adminService.getTaskById(this.id).subscribe((res) => {
      console.log(res);
    });
  }
}
