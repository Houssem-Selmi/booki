import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilisateurService } from '../services/utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private userService: UtilisateurService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.userService.validToken() ) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;

      }
  }
}
