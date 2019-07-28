import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const re = '/utilisateurs/signin';
    const re2 = '/utilisateurs/signup';
    const re3 = '/utilisateurs/checkMail';
    const re4 = '/utilisateurs/getUser';

    if (request.url.search(re) === -1 && request.url.search(re2) === -1
     && request.url.search(re3) === -1) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getAuthorizationToken()}`
      }
    });
  }
    return next.handle(request);
  }
}
