import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-post-task',
  standalone: true,
  imports: [],
  templateUrl: './post-task.component.html',
  styleUrl: './post-task.component.scss',
})
export class PostTaskComponent {
  constructor(private adminService: AdminService) {
    this.getUsers();
    console.log(StorageService.getTtoken());
  }

  getUsers() {
    this.adminService.getUsers().subscribe((res) => {
      console.log(res);
    });
  }
}
