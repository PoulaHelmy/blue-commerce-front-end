import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {SnackbarService} from '../../../@shared/pages/snackbar/snackbar.service';
import {ConfirmDialogService} from '../../../@shared/pages/dialogs/confirm-dialog/confirm.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  subscription: Subscription;
  loading = false;
  data = {};
  options = {
    title: 'Regestered Successfully',
    message: 'Please Check Your Mail TO Confim and Activate Your Account',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private dialogService: ConfirmDialogService
  ) {
  }

  get getEmail() {
    return this.registerForm.get('email');
  }

  get getName() {
    return this.registerForm.get('inputName');
  }


  get getPassword() {
    return this.registerForm.get('password');
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      inputName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?'
        ),
      ]),

      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.loading = true;
    this.data = {
      name: this.registerForm.get('inputName').value,
      email: this.registerForm.get('email').value,
      phone: this.registerForm.get('phone').value,
      password: this.registerForm.get('password').value,
    };
    this.authService
      .register(this.data)
      .subscribe((res: any) => {
        this.dialogService.open(this.options);
        this.dialogService
          .confirmed()
          .toPromise()
          .then((confirmed) => {
            if (confirmed) {
              this.loading = false;
              this.router.navigate(['']);
            }
          })
          .catch((err) => {
            this.snackbarService.show(err['statusText'], 'danger');
          })
          .finally(() => {
            this.router.navigate(['']);
          });
      });
  }

  ngOnDestroy() {
  }
} //end of class
