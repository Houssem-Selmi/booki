import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-user-welcome-content',
  templateUrl: './user-welcome-content.component.html',
  styleUrls: ['./user-welcome-content.component.scss']
})
export class UserWelcomeContentComponent implements OnInit {
  welcome = 'Welcome, ';
  username = '';
  constructor(private userService: UtilisateurService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
      this.welcome += this.username;
  }






}
