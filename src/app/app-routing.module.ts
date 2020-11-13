import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './@shared/pages/not-found/not-found.component';
import {GuestGuardService} from './@core/guards/guest.guard';
import {MainNavComponent} from './@shared/layouts/main-nav/main-nav.component';
import {UserDetailsResolver} from './@core/guards/resolvers/UserAuthResolvers/user-details.resolver';
import {AuthGuard} from './@core/guards/auth.guard';

// @ts-ignore
// @ts-ignore
// @ts-ignore
const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {
    path: 'dashboard',
    component: MainNavComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
    resolve: {item: UserDetailsResolver},
    canActivateChild: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./@auth/auth.module').then((m) => m.AuthModule),
    canActivateChild: [GuestGuardService],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
