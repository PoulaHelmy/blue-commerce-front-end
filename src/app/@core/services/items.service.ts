import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {environment as env} from '../../../environments/environment';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getAllItems(endPoint: string) {
    return this.http.get(`${env.apiRoot}/${endPoint}`, httpOptions).pipe(
      map((res) => {
        return res;
      })
    );
  }


} //end of class
