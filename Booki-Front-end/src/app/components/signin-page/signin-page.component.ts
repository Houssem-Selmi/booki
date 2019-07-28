import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/domain/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss']
})
export class SigninPageComponent implements OnInit {
  component = 'login';
  componentNavbar = 'loginnavbar';

  showSpinner = false;
  userNotFound = false;
  signinForm = new FormGroup({
    loginFormModalEmail : new FormControl('', [Validators.email, Validators.required]),
    loginFormModalPassword : new FormControl('', Validators.required)
  }
  );
  constructor( private userService: UtilisateurService, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  onConnect() {
    this.showSpinner = true;
    const email = this.signinForm.value.loginFormModalEmail;
    const password = this.signinForm.value.loginFormModalPassword;
    let user: User ;
    user = {email: email, password: password };
    this.auth.signin(email, password).subscribe(
          res => { console.log(this.userService.decodeToken(res.token));
          localStorage.setItem('access_token', res.token);
        },
          err => { console.log(err); this.userNotFound = true;
          this.showSpinner = false; },
          () => {
            this.userService.getUserAfterSignin(email).subscribe(
              res => {          localStorage.setItem('username', res.username);
              localStorage.setItem('email', res.email);
             },
              err => {
                this.showSpinner = false;
              },
              () => {
              this.showSpinner = false;
              this.userService.getUserImageName(email).subscribe(
                res => {  localStorage.setItem('imageName', res.imgn);
              },
              err => console.log(err),
              () => {
                const routeToGo = this.userService.getRouteToGo();
                this.router.navigate([routeToGo]);
              }
              );
              }
            );
           }
        );

  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.onConnect();
    }
  }

  passFocus() {
    this.userNotFound = false;
  }

}
