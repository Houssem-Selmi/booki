import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { componentFactoryName } from '@angular/compiler';

@Component({
  selector: 'app-challenge-modal',
  templateUrl: './challenge-modal.component.html',
  styleUrls: ['./challenge-modal.component.scss']
})
export class ChallengeModalComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  emailBody: string;

   @Input()
   modal: any;

   @Input()
   title: string;

   @Input()
   nbLivreDone: number;

  @Input()
  imageUrl: string;

  @Input()
  nbreTotalLivre;

  @Input()
  component: string;

  ngOnInit() {
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

closeModal() {
  this.modal.hide();
}

getEmailHeader(): string {
  return  `mailto:?subject=Challenge ${this.title} Accompli&subject=Big%20News&body=`;
}

getEmailBody(): string {
  return this.getEmailHeader() + `Je vous informe que j'ai réussi à  accomplir le défis ${this.title} en lisant
  ${this.nbLivreDone} livres sur Booki.` ;
}

}
