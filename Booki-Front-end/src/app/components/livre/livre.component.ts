import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { LivresService } from 'src/app/services/livres.service';
import { Livre } from 'src/app/domain/Livre';
import { IBookRate } from 'src/app/domain/IBookRate';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DefisLectureService } from 'src/app/services/defis-lecture.service';
import { Challenge } from 'src/app/domain/Challenge';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.scss']
})
export class LivreComponent implements OnInit {
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
  public challengesList: Challenge[];

  @Input()
  component: string;
  @Input()
  public rating: number;
  public descriptionMod;
  allBooksDone: any;


  livre: Livre;
  constructor(private sanitizer: DomSanitizer,
     private livreService: LivresService,
     private challengeService: DefisLectureService,
     private userService: UtilisateurService

      ) {
  }

  @Output()
  bookRemoved = new EventEmitter<string>();


  @Output()
  bookDone = new EventEmitter<IBookRate>();


  @Output()
  rateChanged = new EventEmitter<number>();

  ngOnInit() {
    this.livre = {
   isbn: this.isbn,
  titre: this.titre,
  description: this.description,
   imageUrl: this.imageUrl,
   auteur: this.auteur,
   utilisateurs: []
    };
    this.descriptionMod = this.description;
    if ( this.description.length > 100 ) {
      this.descriptionMod = this.descriptionMod.substring(0, 100) + '...';
    }
  }


// listen to the addToCardEvent from the child : livre modal
  onAddtoListeLecture() {
    this.livreService.getAllUserDoneBooks().subscribe(
      res => { this.allBooksDone = res;  },
      err => {},
      () => {
        this.allBooksDone.forEach(element => {
          if (element.livre.isbn === this.livre.isbn) {console.log('ouiiii');
          this.livreService.removeBookFromUser(this.livre.isbn).subscribe(
            res => { console.log('removed'); },
            err => console.log(err),
            () => {

              // this.getAllUserBooks();
              this.challengeService.getAllDefis().subscribe(
                resu => { this.challengesList = resu; },
                err => {},
                () => {

                  this.userService.getBookDoneCount(localStorage.getItem('email')).subscribe(
                    res => {  console.log('count ' + res);
                      this.challengesList.forEach(element2 => {

                        if ( element2.nbreTotalLivre > res ) {
                          console.log(res);
                          console.log(element.nbreTotalLivre);
                          this.challengeService.deleteUserChallenge(element2.nbreTotalLivre, localStorage.getItem('email') ).subscribe(
                            resultat => {
                              console.log(' deleted Challenge ' + resultat);
                            },
                            error => console.log(error),
                            () => {
                              /*
                              this.livreService.addBookToUser(this.livre).subscribe(
                                res2 => { console.log('addded');
                                },
                                err => console.log( err),
                                () => {
                                 }
                              );
                              */
                            }
                          );
                        }

                      });
                     }
                  );
                }
              );
            }
          );
        } else {

        }
        });
        this.livreService.addBookToUser(this.livre).subscribe(
          res3 => {
          },
          err => console.log( err),
          () => {
           }
        );
      }
    );

     }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}

onBookDone(event: IBookRate) {
this.bookDone.emit(event);
}

onRateChange(rate: number) {
this.rateChanged.emit(rate);
}

onRemoveFromReadingList() {
this.bookRemoved.emit(this.isbn);
}

}


