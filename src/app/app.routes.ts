import { Routes } from '@angular/router';
import { AdminModule } from './modules/admin/admin.module';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(
        (cmp) => cmp.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/components/signup/signup.component').then(
        (cmp) => cmp.SignupComponent
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./modules/employee/employee.module').then(
        (m) => m.EmployeeModule
      ),
  },
];
