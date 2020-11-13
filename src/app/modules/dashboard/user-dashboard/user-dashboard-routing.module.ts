import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from '../../../@shared/pages/not-found/not-found.component';
import {ProductsComponent} from './pages/products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
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
export class UserDashboardRoutingModule {
}
