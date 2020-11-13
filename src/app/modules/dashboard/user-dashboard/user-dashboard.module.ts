import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import {UserDashboardRoutingModule} from './user-dashboard-routing.module';
import {UserDashMainComponent} from './pages/user-dash-main/user-dash-main.component';
import {SharedModule} from '../../../@shared/shared.module';
import {MaterialModule} from '../../../@shared/material/material.module';
import { ProductsComponent } from './pages/products/products.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CategoriesComponent } from './pages/categories/categories.component';

@NgModule({
  declarations: [UserDashMainComponent, ProductsComponent, BrandsComponent, CategoriesComponent],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {floatLabel: 'always'},
    },
  ],
})
export class UserDashboardModule {
}
