import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../../../../@auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class UserDetailsResolver implements Resolve<any> {
  constructor(private authService: AuthService) {
  }

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.authService.getDetails().pipe(
      map((res) => {
        return res['data'];
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
