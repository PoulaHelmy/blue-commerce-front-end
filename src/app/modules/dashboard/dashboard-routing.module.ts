import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../@core/guards/auth.guard';
import {NotFoundComponent} from '../../@shared/pages/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../dashboard/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
    pathMatch: 'full',
    canActivateChild: [AuthGuard],
  },
  // {
  //   path: 'items',
  //   loadChildren: () =>
  //     import('app/modules/dashboard/items/items.module').then(
  //       (m) => m.ItemsModule
  //     ),
  //   canActivateChild: [AuthGuard],
  // },

  {
    path: 'account',
    loadChildren: () =>
      import('../dashboard/account/account.module').then(
        (m) => m.AccountModule
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {
}
