import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {AuthService} from '../../../@auth/services/auth.service';
import {SnackbarService} from '../../pages/snackbar/snackbar.service';
import {OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {

  /*-------------------User Details------------------------*/
  userDetails;
  defImg = '../../../../assets/imgs/undraw_profile_pic_ic5t.svg';
  themeClass: string = localStorage.getItem('defaultTheme')
    ? localStorage.getItem('defaultTheme')
    : 'blue-commerce-theme';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
    private overlayContainer: OverlayContainer,
  ) {
  }

  ngOnInit(): void {
    // remove old theme class and add new theme class
    // we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
    const overlayContainerClasses = this.overlayContainer.getContainerElement()
      .classList;
    const themeClassesToRemove = Array.from(
      overlayContainerClasses
    ).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add('my-theme');
    /*---------------- For UserDetails-------------------*/
    this.authService.getDetails().subscribe((res) => {
      this.userDetails = res['data'];
      console.log(this.userDetails);
    });
  } // end Of NgONInit

  // tslint:disable-next-line:typedef
  changeTheme(value: string) {
    this.themeClass = value;
    localStorage.setItem('defaultTheme', value);
  }

  /*------------------LogOut------------------------ */

  // tslint:disable-next-line:typedef
  logout() {
    if (localStorage.getItem('isAuth') === 'false') {
      this.snackbar.show(
        'Unauthorized Request You Not Logged in yet   ',
        'danger'
      );
    } else {
      this.authService
        .logout()
        .toPromise()
        .then((res) => {
          localStorage.removeItem('access_token');
          this.authService.setIsAuthenticated(false);
          localStorage.setItem('isAuth', 'false');
          localStorage.setItem('defaultTheme', '');
          this.snackbar.show('Logged Out Successfully', 'success');
          this.router.navigate(['/home']);
        })
        .catch((err) => {
          this.snackbar.show(err.error.message, 'danger');
        })
        .finally(() => {
        });
    }
  }

  /*------------------------------------------------ */
} // end of class
