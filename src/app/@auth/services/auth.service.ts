import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endPoint: string = 'auth';
  options: any;
  /*---------------------------------------------------------- */
  private isAuthenticated = new BehaviorSubject(
    this.getIsAuthenticated() || false
  );
  isAuthenticated$ = this.isAuthenticated.asObservable();

  /*---------------------------------------------------------- */
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token',
      }),
    };
  }

  getIsAuthenticated(): boolean {
    return localStorage.getItem('access_token') ? true : false;
  }

  // tslint:disable-next-line:typedef
  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated.next(isAuthenticated);
  }

  // tslint:disable-next-line:typedef
  login(email: string, password: string) {
    return this.http
      .post(
        `${env.apiRoot}/${this.endPoint}/login`,
        {
          email,
          password,
        },
        this.options
      );
  }

  // tslint:disable-next-line:typedef
  register(data: object) {
    return this.http
      .post(`${env.apiRoot}/${this.endPoint}/signup`, data, this.options);
  }

  // tslint:disable-next-line:typedef
  logout() {
    return this.http
      .get(`${env.apiRoot}/${this.endPoint}/logout`, httpOptions);
  }

  // tslint:disable-next-line:typedef
  forgetPassword(email: string) {
    return this.http
      .post(`${env.apiRoot}/password/create`, {email}, this.options);
  }

  // tslint:disable-next-line:typedef
  resetPassword(data: object) {
    return this.http
      .post(`${env.apiRoot}/password/reset`, data, this.options);
  }

  // tslint:disable-next-line:typedef
  getDetails() {
    return this.http
      .get(`${env.apiRoot}/${this.endPoint}/user`, httpOptions);
  }// return this auth user data

  // tslint:disable-next-line:typedef
  updateProfileData(data: object) {
    return this.http
      .post(`${env.apiRoot}/${this.endPoint}/update`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          Accept: 'application/json',
          'Access-Control-Allow-Methods': ' GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': ' Origin, Content-Type, X-Auth-Token',
        },
      });
  }


  // tslint:disable-next-line:typedef
  changePassword(data: object) {
    return this.http
      .post(`${env.apiRoot}/auth/update/password`, data, httpOptions);
  }
} // end of class


