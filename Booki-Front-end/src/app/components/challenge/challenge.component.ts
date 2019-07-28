import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  nbreTotalLivre;

  @Input()
  nbLivreDone: number;

  @Input()
  imageUrl: string;

  @Input()
  component: string;

  constructor() { }

  ngOnInit() {
  }

}
