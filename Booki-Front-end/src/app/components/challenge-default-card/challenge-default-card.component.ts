import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenge-default-card',
  templateUrl: './challenge-default-card.component.html',
  styleUrls: ['./challenge-default-card.component.scss']
})
export class ChallengeDefaultCardComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  nbreTotalLivre;

  @Input()
  nbLivreDone: number;

 @Input()
 imageUrl: string;

 @Input()
 description: string;

 @Input()
 component: string;
 public done = 'doneClass';
 public undone = 'undoneClass';
 public checkClass: string;


  constructor() { }

  ngOnInit() {
    if (this.nbLivreDone > this.nbreTotalLivre) {
      this.nbLivreDone = this.nbreTotalLivre;
    }

    if ( this.nbLivreDone === this.nbreTotalLivre ) {
        this.checkClass = this.done;
    } else {
      this.checkClass = this.undone;
    }
  }

}
