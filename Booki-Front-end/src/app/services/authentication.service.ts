import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/User';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  URL_BASE = environment.apiBaseUrl;
  URL_SIGNIN = '/utilisateurs/signin';
  URL_SIGNUP = '/utilisateurs/signup';

  constructor(private http: HttpClient) { }

  getAuthorizationToken() {
    return localStorage.getItem('access_token');
  }

  signin(email: string, password: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

      return <Observable<any>>this.http.post(this.URL_BASE + this.URL_SIGNIN, {}, { params: params});
  }

  signup(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

      return <Observable<any>>this.http.post(this.URL_BASE + this.URL_SIGNUP, user);
  }




}
