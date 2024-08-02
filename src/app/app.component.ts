import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StorageService } from './auth/services/storage/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  isEmployeeLoggedIn: boolean = StorageService.isUserLogged();
  isAdminLoggedIn: boolean = StorageService.isAdminLogged();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.isEmployeeLoggedIn = StorageService.isUserLogged();
      this.isAdminLoggedIn = StorageService.isAdminLogged();
    });
  }

  logout() {
    StorageService.logout();
    this.router.navigate(['/login']);
  }
}
