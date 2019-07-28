import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { User } from 'src/app/domain/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-modal',
  templateUrl: './signin-modal.component.html',
  styleUrls: ['./signin-modal.component.scss']
})
export class SigninModalComponent implements OnInit {


  signinForm = new FormGroup({
    loginFormModalEmail : new FormControl('', [Validators.email, Validators.required]),
    loginFormModalPassword : new FormControl('', Validators.required)
  }
  );

  showSpinner = false;
  @Input()
  modal: any;
  userNotFound = false;
  constructor( private userService: UtilisateurService, private auth: AuthenticationService, private router: Router) { }

  @Output()
  signupOpen = new EventEmitter<boolean>();

  ngOnInit() {
  }

  onClose() {
    this.modal.hide();
  }

  openSignup() {
    this.signupOpen.emit(true);
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
              res => { localStorage.setItem('username', res.username);
              localStorage.setItem('email', res.email);
              this.userService.getUserImageName(email).subscribe(
                res2 => {  localStorage.setItem('imageName', res2.imgn);
              },
              err => console.log(err),
              () => {
                this.modal.hide();
                this.router.navigate(['/welcome']);
              });
             },
              err => {
                this.showSpinner = false;
              },
              () => {
              this.showSpinner = false;
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
