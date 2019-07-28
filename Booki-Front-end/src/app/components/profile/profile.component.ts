import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { User } from 'src/app/domain/User';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { map } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { DefisLectureService } from 'src/app/services/defis-lecture.service';
import { Challenge } from 'src/app/domain/Challenge';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  URL_BASE = environment.apiBaseUrl;

    username = '';
    level = '' ;
    email = '';
    emailErrorMessage = 'E-mail non valide / E-mail existant';
    mdpErrorMessage = 'Minimum 5 caractères';
    showSpinner = false;
    showSuccess = false;
    showFail = false;
    imageRes = '';
    nbLivreDone = 0;
    listChallenges: Challenge[];
    profileForm = new FormGroup({
      signupFormModalUsername: new FormControl(localStorage.getItem('username'), Validators.required),
      loginFormModalPasswordOld: new FormControl('', [ Validators.minLength(5)]),
      loginFormModalPasswordNew: new FormControl('', [ Validators.minLength(5)])

    }
    );
    constructor(private router: Router, private defisService: DefisLectureService,
      private userService: UtilisateurService, private uploadService: UploadFileService,
      private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.getUserBadgeText();
    this.username = localStorage.getItem('username');
    this.level = 'Novice ';
    this.email = localStorage.getItem('email');
   // this.profileForm.value.signupFormModalEmail = localStorage.getItem('email');
   this.userService.getBookDoneCount(this.email).subscribe(
     res => { this.nbLivreDone = res; } ,
     err => console.log(err)
   );
   this.getImageNameLocal();

  }

  uploadPic() {
    console.log('uplod pic');
  }

  passItpass(): boolean {
    return  this.profileForm.value.loginFormModalPasswordNew !== '' && this.profileForm.value.loginFormModalPasswordOld !== '';
  }

  onSauvegarder() {
    if ( this.profileForm.value.signupFormModalUsername !== localStorage.getItem('username')) {

      this.userService.updateUsername(this.email, this.profileForm.value.signupFormModalUsername ).subscribe(
        res => { console.log(res); this.showSuccess = true; this.showFail = false;
         localStorage.removeItem('username');
       localStorage.setItem('username', this.profileForm.value.signupFormModalUsername);

     },
        err => { console.log(err);
          this.showSuccess = false;
          this.showFail = true;
        },
        () => {
          this.username = this.profileForm.value.signupFormModalUsername;
        }
      );
    }


    if ( this.passItpass()) {
     const oldPass = this.profileForm.value.loginFormModalPasswordOld;
     const newPass = this.profileForm.value.loginFormModalPasswordNew;

      this.userService.updatePassword(this.email, oldPass, newPass).subscribe(
        res => {console.log(res); this.showSuccess = true; this.showFail = false;
          this.authService.signin(this.email, this.profileForm.value.loginFormModalPasswordNew).subscribe(
            res2 => { localStorage.removeItem('access_token');
            localStorage.setItem('access_token', res2.token);
          }
          );
        },
        err => { console.log(err);
          this.showSuccess = false; this.showFail = true; },
          () => {
            // this.clearFields();
            this.profileForm.value.signupFormModalUsername = localStorage.getItem('username');
          }
      );
    }
  }

  clearFields() {
    this.profileForm.value.loginFormModalPasswordOld = '';
    this.profileForm.value.loginFormModalPasswordNew = '';
    // this.profileForm.reset();
  }

  getUserBadgeText() {
    this.defisService.getAllUserDefis(localStorage.getItem('email')).subscribe(
      res => {console.log(res); this.listChallenges = res;
        if (res.length > 0) {
          this.level = res[res.length - 1].titre;

        }
      },
      err => {},
      () => {
        if  ( this.listChallenges.length > 0 ) {
          this.level = this.listChallenges[0].titre;
          let max = this.listChallenges[0].nbreTotalLivre;
          this.listChallenges.forEach(element => {
           if ( element.nbreTotalLivre > max) {
            max = element.nbreTotalLivre;
            this.level = element.titre;
           }
          } );
        }

      }
    );
  }


  selectFile(event) {
    console.log(event.target.files[0].name);
    this.uploadService.pushFileToStorage(event.target.files.item(0)).subscribe(
      res => { console.log('added'); },
      err => { console.log(err);
        this.userService.updateImage(this.email, event.target.files[0].name).subscribe(
          res2 => { console.log(res2); },
          err2 => { console.log(err2); },
          () => {
            this.getImageName(this.email);
          }
        ); } ,
      () => {
        this.userService.updateImage(this.email, event.target.files[0].name).subscribe(
          res => { console.log(res); },
          err => { console.log(err); },
          () => {
            this.getImageName(this.email);
          }
        );
      }
    );

  }

  getImageName(email: string) {
    this.userService.getUserImageName(email).subscribe(
      res => {this.imageRes = this.URL_BASE + '/files/' + res.imgn; console.log(this.imageRes);
      localStorage.setItem('imageName', res.imgn);
      this.uploadService.imgChanged(res.imgn);
    } ,
      err => { console.log(err); },
      () => {
      }
    );
  }

  getImageNameLocal() {
    this.imageRes = this.URL_BASE + '/files/' + localStorage.getItem('imageName');
  }

}
