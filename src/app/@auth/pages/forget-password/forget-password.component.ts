import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {SnackbarService} from '../../../@shared/pages/snackbar/snackbar.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  forgetForm: FormGroup;
  loading = false;

  // @ts-ignore
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
  }

  get getEmail() {
    return this.forgetForm.get('email');
  }

  ngOnInit() {
    this.forgetForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?'
        ),
      ]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .forgetPassword(this.forgetForm.get('email').value)
      .toPromise()
      .then((res: any) => {
        this.snackbarService.show(res['message'], 'success');
        this.loading = false;

        this.router.navigate(['auth/login']);
      })
      .catch((err) => {
        this.loading = false;

        this.snackbarService.show(err['error']['message'], 'danger');
      });
  }
} //end of class
