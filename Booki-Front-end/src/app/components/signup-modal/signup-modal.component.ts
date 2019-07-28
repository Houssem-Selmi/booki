import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/domain/User';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.scss']
})
export class SignupModalComponent implements OnInit {
  emailErrorMessage = 'E-mail non valide / E-mail existant';
  mdpErrorMessage = 'Minimum 5 caractères';

  showSpinner = false;
  showSuccess = false;
  showFail = false;
  @Input()
  component: string;
  @Input()
  modal: any;

  @Output()
  signinOpen = new EventEmitter<boolean>();
  constructor(private router: Router,
    private userService: UtilisateurService, private fb: FormBuilder, private authService: AuthenticationService) { }

  profileForm = new FormGroup({
    signupFormModalUsername: new FormControl('', Validators.required),
    loginFormModalEmail: new FormControl('', [Validators.email, Validators.required ], [ this.emailExist.bind(this) ]),
    loginFormModalPassword: new FormControl('', [ Validators.required, Validators.minLength(5)])

  }
  );


  ngOnInit() {
  }

  onClose() {
    this.modal.hide();
  }

  onSigninOpen() {
    this.signinOpen.emit(true);
  }

  onSignUp() {
    this.showSpinner = true;
    const user: User = {email: '', username: '', password: ''};
    user.email = this.profileForm.value.loginFormModalEmail;
    user.password = this.profileForm.value.loginFormModalPassword;
    user.username = this.profileForm.value.signupFormModalUsername;
    this.authService.signup(user).subscribe(
      res => {  localStorage.setItem('access_token', res.token);
      },
      err => {/* show fail alert */ this.showFail = true; console.log(err); this.showSpinner = false; },
      () => {
        /* show success alert */
        this.showSuccess = true;
        this.showSpinner = false;
        {
          this.userService.getUserAfterSignin(user.email).subscribe(
            res => {          localStorage.setItem('username', res.username);
            localStorage.setItem('email', res.email);
            localStorage.setItem('imageName', 'default.png');
            const routeToGo = this.userService.getRouteToGo();
            this.router.navigate([routeToGo]);
           },
            err => {
              this.showSpinner = false;
            },
            () => {
            this.showSpinner = false;
            }
          );
         }
      }
    );
  }



    emailExist(control: AbstractControl) {
      console.log(control.value);
      return this.userService.checkEmail(control.value).pipe(
        map(result => result ? { invalid: true }  : null)
      );
}






}
