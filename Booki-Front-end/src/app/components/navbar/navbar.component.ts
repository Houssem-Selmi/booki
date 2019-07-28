import { Component, OnInit, Input, AfterViewChecked, AfterViewInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  imageRes = '';

  @Input()
  component: string;
  username = '';
  email = '';
  validToken = true;
  URL_BASE = environment.apiBaseUrl;

  constructor(private userService: UtilisateurService, private route: Router) { }

ngOnInit() {
  this.getValidity();
  this.getImageNameLocal();
}

clearCach() {
  localStorage.clear();
  this.getValidity();
  this.userService.setUserToGo('/welcome');

}

getValidity() {
  this.username = localStorage.getItem('username');
  this.email = localStorage.getItem('email');

  this.validToken = this.userService.validToken();
}

getImageNameLocal() {
  this.imageRes = this.URL_BASE + '/files/' + localStorage.getItem('imageName');
}


}
