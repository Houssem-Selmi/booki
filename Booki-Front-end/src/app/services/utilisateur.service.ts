import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../domain/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  URL_BASE = environment.apiBaseUrl;
  URL_USER = '/utilisateurs';
  URL_GET_USER = '/getUser';
  URL_UPDT_USERNAME = '/updateUsername';
  URL_UPDT_PASSWORD = '/updatePassword';
  URL_UPDT_IMAGE = '/updateImageName';
  URL_GET_IMG = '/getUserImageName';
  URL_CHECk_EMAIL = '/checkMail';
  URL_COUNT_DONE_BOOKS = '/getCountBooksDone';
  routeToGo = '/';
  constructor(private http: HttpClient) {

   }
  helper = new JwtHelperService();
  currentUser: any = null;
   setUserToGo(route: string) {
    this.routeToGo = route;
   }

   getRouteToGo() {
     return this.routeToGo;
   }

  addUser(user: User) {
    return this.http.post<User>(this.URL_BASE + this.URL_USER + '/create', user);
  }

  updateUsername( email: String, username: String ) {
    const addBody = {
      'email': email,
      'username': username
    } ;

    return  this.http.post<User>(this.URL_BASE + this.URL_USER + this.URL_UPDT_USERNAME, addBody);
  }



  updateImage( email: String, imgName: String ) {
    const addBody = {
      'email': email,
      'imageName': imgName
    } ;

    return  this.http.post<User>(this.URL_BASE + this.URL_USER + this.URL_UPDT_IMAGE, addBody);
  }


  updatePassword( email: String, oldPass: String, newPass: String ) {
    const addBody = {
      'email': email,
      'oldPass': oldPass,
      'newPass': newPass
    } ;

    return  this.http.post<User>(this.URL_BASE + this.URL_USER + this.URL_UPDT_PASSWORD, addBody);
  }

  getUser(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<User>(this.URL_BASE + this.URL_USER + this.URL_GET_USER, { params : params});

  }

  getUserImageName(email: string) {

    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<any>(this.URL_BASE + this.URL_USER + this.URL_GET_IMG, {  params : params}  );

  }
  checkEmail(email: string) {
    let params = new HttpParams();

    params = params.append('email', email);
    return this.http.get<boolean>(this.URL_BASE + this.URL_USER + this.URL_CHECk_EMAIL, { params : params});
  }

  getBookDoneCount(email: string) {
    let params = new HttpParams();

    params = params.append('email', email);
    return this.http.get<number>(this.URL_BASE + this.URL_USER + this.URL_COUNT_DONE_BOOKS, { params : params});

  }


  getCurrentUser(email: string): any {
      return this.getUserAfterSignin(email);
  }

setUserConnected( user: any) {
  this.currentUser = user;
}

getUserConnected() {
  return this.currentUser;
}

  getAuthorizationToken() {
    return localStorage.getItem('access_token');
  }

  validToken(): boolean {
    if ( this.getAuthorizationToken() !== null ) {
      if (!this.helper.isTokenExpired(this.getAuthorizationToken())) {
        return true;
      } else  { return false; }
    } else {
      return false;
    }
  }


  decodeToken(token: any) {
    return this.helper.decodeToken(token);
  }

  getUserAfterSignin(email: string)  {
   return this.getUser(email);
  }


}
