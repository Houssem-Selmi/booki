import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { LivresService } from 'src/app/services/livres.service';
import { IBookRate } from 'src/app/domain/IBookRate';

@Component({
  selector: 'app-livre-modal',
  templateUrl: './livre-modal.component.html',
  styleUrls: ['./livre-modal.component.scss']
})
export class LivreModalComponent implements OnInit {
  public rate = 0;
  public checked = false;
  public bookRate: IBookRate;
  constructor(private sanitizer: DomSanitizer, private livreService: LivresService) {}

  @Input()
  isbn: string;
  @Input()
  titre: string;
  @Input()
  description: string;
  @Input()
  imageUrl: string;
  @Input()
  auteur: string;
  @Input()
  rating: number;


  @Input()
  modal: any;

  @Input()
  component: any;



  exist = false;

  emailBody: string;
  emailHeader = 'mailto:?subject=Reccomendation du livre&subject=Big%20News&body=';

  // send signal to livre component pour appeler bookService et ajouter ce book la à l'utilisateur concerné
  @Output()
  addToReadingList = new EventEmitter<boolean>();
  // send signal to livre component pour appeler bookService et remove ce book la à l'utilisateur concerné

  @Output()
  rateChange = new EventEmitter<number>();

  @Output()
  removeFromReadingList = new EventEmitter<boolean>();

  @Output()
  bookDoneEmit = new EventEmitter<IBookRate>();

  ngOnInit() {
     this.livreService.userHasBook(this.isbn).subscribe(
       res => this.exist = res,
       error => console.log(error)
     );
     this.rate = this.rating;
  }

  onBookDone() {
    if (this.checked || this.component === 'LivreDone') {
    this.bookDoneEmit.emit({isbn: this.isbn, rate: this.rate});
    }

  }

  onRateChange(rate: number) {
    this.rateChange.emit(rate);
  }

  // on add to card send signal to the parent eli houa livre component
  onAddToReadingList() {
    this.exist = true;
    this.addToReadingList.emit();
  }

  // on remove from card send signal to the parent eli houa livre component
  onRemoveFromReadingList() {
    this.exist = false;
    this.removeFromReadingList.emit();
    if (this.component === 'ListeLecture') {
      this.modal.hide();
    }
  }


  onCheckChange(add: boolean ) {
    this.checked = add;
  }


  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

getEmailBody(): string {
  return this.emailHeader + `Je vous recommande à lire le livre ${this.titre} de ${this.auteur}
  que j'ai lu et que je le note avec ${this.rate} / 5 . `;
}

  closeModal() {
    if (this.component === 'ListeLecture') {
      this.onBookDone();
    }
    this.modal.hide();
  }

}
