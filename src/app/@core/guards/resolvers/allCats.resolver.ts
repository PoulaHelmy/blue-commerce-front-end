import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ApiService} from '../../http/api.service';

@Injectable({providedIn: 'root'})
export class AllCategoriesResolver implements Resolve<any> {
  constructor(private apiService: ApiService) {
  }

  resolve(next: ActivatedRouteSnapshot): Observable<any> {
    return this.apiService.getAllItems('categories').pipe(
      map((res) => {
        return res;
      }),
      catchError(() => {
        return of('No Data');
      })
    );
  }
}
