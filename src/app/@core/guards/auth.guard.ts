import {CanActivateChild, Router, UrlTree,} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from '../../@auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivateChild():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigateByUrl('/auth/login');
      })
    );
  }
} // end of class
