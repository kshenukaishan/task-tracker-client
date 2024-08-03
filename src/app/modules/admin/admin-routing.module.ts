import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../admin/components/dashboard/dashboard.component').then(
        (cmp) => cmp.DashboardComponent
      ),
  },
  {
    path: 'task',
    loadComponent: () =>
      import('../admin/components/post-task/post-task.component').then(
        (cmp) => cmp.PostTaskComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
