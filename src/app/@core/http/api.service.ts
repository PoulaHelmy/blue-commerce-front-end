import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};
const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  options = {
    title: 'Are Sure To Delete This Item',
    message: 'Please Take An Action { You Press Esc or Enter to the Action }',
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  };

  constructor(
    private http: HttpClient,
  ) {
  }

  getItem(id: string, endPoint: string): Observable<any> {
    return this.http.get<any>(`${env.apiRoot}/${endPoint}/${id}`).pipe(
      map((response) => {
        return response;
      }),
    );
  }

  getAllItems(endPoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${env.apiRoot}/${endPoint}`).pipe(
      map((data) => {
        return data;
      }),
    );
  }

  getAllInputs(
    filter: string = '',
    order: string = 'id',
    sort: string = 'asc',
    page: number = 0,
    pageSize: number = 0,
    endPoint: string
  ): Observable<any[]> {
    const requestUrl = `${env.apiRoot}/filter/${endPoint}`;

    return this.http.get<any[]>(requestUrl, {
      params: new HttpParams()
        .set('filter', filter)
        .set('order', order)
        .set('sort', sort)
        .set('page', page.toString())
        .set('pageSize', pageSize.toString()),
    });
  }

} // end of class
