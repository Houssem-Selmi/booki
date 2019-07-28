import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-user-welcome',
  templateUrl: './navbar-user-welcome.component.html',
  styleUrls: ['./navbar-user-welcome.component.scss']
})
export class NavbarUserWelcomeComponent implements OnInit {
  username = '';
  email = '';
  imageRes = '';
  URL_BASE = environment.apiBaseUrl;

  constructor(private userService: UtilisateurService, private uploadService: UploadFileService) { }
  public html = '<span class="btn btn-danger">Your HTML here</span>';

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.getImageNameLocal();
    this.uploadService.switchImageEvent.subscribe(
      res => {    this.imageRes = this.URL_BASE + '/files/' + res;
    }
    );
  }

  clearCach() {
    localStorage.clear();
    this.userService.setUserToGo('/welcome');
  }

  bl() {
    console.log('gmmmm');
  }

  close(event: any) {
    console.log('okkkk');
  }


  selectFile(event) {
    console.log(event.target.files[0].name);
    this.uploadService.pushFileToStorage(event.target.files.item(0)).subscribe();
    this.userService.updateImage(this.email, event.target.files[0].name).subscribe(
      res => { console.log(res); },
      err => { console.log(err); }
    );
  }

  getImageNameLocal() {
    this.imageRes = this.URL_BASE + '/files/' + localStorage.getItem('imageName');
  }

}
