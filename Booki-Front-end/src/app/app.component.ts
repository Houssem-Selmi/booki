import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from './services/utilisateur.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Booki-Front-end';
  currentUser: any = null ;

  constructor(private userService: UtilisateurService) {

  }
  ngOnInit() {}

  }

