import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {ActivateAccountComponent} from './pages/activate-account/activate-account.component';
import {ForgetPasswordComponent} from './pages/forget-password/forget-password.component';
import {RequestPasswordResolver} from '../@core/guards/resolvers/UserAuthResolvers/request-password.resolver';
import {AcountActivatedResolver} from '../@core/guards/resolvers/UserAuthResolvers/account-activate.resolver';
import {NotFoundComponent} from '../@shared/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    resolve: {item: RequestPasswordResolver},
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent,
  },
  {
    path: 'activate',
    component: ActivateAccountComponent,
    resolve: {item: AcountActivatedResolver},
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
export class authRoutingModule {
}
