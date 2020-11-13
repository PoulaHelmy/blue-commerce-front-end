import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material/material.module';
import {HttpClientModule} from '@angular/common/http';
import {SharedRoutingModule} from './shared-routing.module';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {FilterPipePipe} from './pipes/filter-pipe.pipe';
import {SnackbarComponent} from './pages/snackbar/snackbar.component';
import {MainNavComponent} from './layouts/main-nav/main-nav.component';
import {ImgDefualtPipe} from './pipes/img-defualt.pipe';
import {ConfirmDialogComponent} from './pages/dialogs/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './pages/dialogs/confirm-dialog/confirm.service';

@NgModule({
  declarations: [
    NotFoundComponent,
    FilterPipePipe,
    ConfirmDialogComponent,
    SnackbarComponent,
    MainNavComponent,
    ImgDefualtPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    NotFoundComponent,
    FilterPipePipe,
    ConfirmDialogComponent,
    SnackbarComponent,
    MainNavComponent,
    ImgDefualtPipe,
  ],
  providers: [ConfirmDialogService],

})
export class SharedModule {
}
