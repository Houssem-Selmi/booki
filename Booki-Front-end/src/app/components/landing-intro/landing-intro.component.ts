import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-landing-intro',
  templateUrl: './landing-intro.component.html',
  styleUrls: ['./landing-intro.component.scss']
})
export class LandingIntroComponent implements OnInit {

  constructor(private userService: UtilisateurService) { }

  ngOnInit() {
  }

  start() {
    if ( this.userService.getUserConnected() !== null) {
      console.log('allowed');
    } else {
      console.log('not allowed');
    }
  }

}
