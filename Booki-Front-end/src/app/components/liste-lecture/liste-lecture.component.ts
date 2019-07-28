import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/app/domain/livre';
import { LivresService } from 'src/app/services/livres.service';
import { IBookRate } from 'src/app/domain/IBookRate';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DefisLectureService } from 'src/app/services/defis-lecture.service';
import { Challenge } from 'src/app/domain/Challenge';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-liste-lecture',
  templateUrl: './liste-lecture.component.html',
  styleUrls: ['./liste-lecture.component.scss']
})
export class ListeLectureComponent implements OnInit {
  public component = 'ListeLecture';
  public serverDown = false;
  public showSpinner = false;
  public showLittleSpinner = false;
  public showDoneSpinner = true;

  public noBooks = false;
  public noBooksDone = false;
  public bookList: Livre[] = [];
  public bookListDone: any[] = [];
  public currentlivre: Livre = null;
  public newRate: number = null;
  public underline = 'underline';
  public notunderline = 'notunderline';
  public alireClasse = this.underline;
  public toggle = 1;
  public livreLusClasse = this.notunderline;
  public challengesList: Challenge[];
public booksToPaged: Livre[] = this.bookList;
  /* Pager
      Service */

// pager object
  pager: any = {};

// paged items
pagedItemsA: any[];
pagedItemsB: any[];

  constructor(private router: Router, private toastrService: ToastrService, private livreService: LivresService,
    private userService: UtilisateurService,
      private challengeService: DefisLectureService,
      private pagerService: PagerService) { }

      private email;

  ngOnInit() {
    this.email = localStorage.getItem('email');

    this.showSpinner = true;
    this.noBooks = false;
    this.setPageA(1);
    // param toggle w f service ken toggle 1 ywali ekhdem b url all books , ken 2 allbooksdone
   this.getAllUserBooks();

  }

  showSuccess(title: string, description: string) {
    this.toastrService.success(description, title , {
      timeOut: 8000, closeButton: true, positionClass: 'toast-bottom-right'
    }).onTap.subscribe(
      res => { this.router.navigate(['challenges']); }
    );
  }

  setPageA(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.bookList.length, page);

    // get current page of items
    this.pagedItemsA = this.bookList.slice(this.pager.startIndex, this.pager.endIndex + 1);
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 8);
}

setPageB(page: number) {
  // get pager object from service
  this.pager = this.pagerService.getPager(this.bookListDone.length, page);

  // get current page of items
  this.pagedItemsB = this.bookListDone.slice(this.pager.startIndex, this.pager.endIndex + 1);
  const scrollToTop = window.setInterval(() => {
    const pos = window.pageYOffset;
    if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
        window.clearInterval(scrollToTop);
    }
}, 8);
}

  getAllChallenges() {
    this.challengeService.getAllDefis().subscribe(
      res => {
       this.challengesList = res;
       console.log(res);
      },
      err => { console.log(err); },
      () => {
        this.userService.getBookDoneCount(this.email).subscribe(
          res => {
            this.challengesList.forEach(element => {

              if ( element.nbreTotalLivre === res ) {
                this.challengeService.addDefisToUser(element.nbreTotalLivre, this.email).subscribe(
                  resultat => {
                    console.log(' add defis to user ' + resultat);
                  },
                  error => console.log(error)
                );
                if ( this.component === 'ListeLecture') {
                  this.playAudio();
                  this.showSuccess(element.titre + ' : Challenge Terminé ', element.nbreTotalLivre + ' Livres lus 😃 ');
                }
                }
            });
           }
        );
      }
    );
  }

  playAudio() {
    const audio = new Audio();
    audio.src = '../../../assets/sounds/definite.mp3';
    audio.load();
    audio.play();
  }

  onBookDone(bookRateDone: IBookRate) {
    this.livreService.getBookByIsbn(bookRateDone.isbn).subscribe(
      res => { this.currentlivre = res; } ,
      err => console.log(err),
      () => {
        let rater = bookRateDone.rate;
        if ( this.newRate !== null ) {
          if (this.newRate !== bookRateDone.rate) { rater = this.newRate; }
        }
        this.livreService.addBookDoneToUser(this.currentlivre, rater).subscribe(
          res => {},
          error => console.log(error),
          () => {
            this.getAllChallenges();
            if (this.component === 'ListeLecture') {
              this.onBookRemoved(this.currentlivre.isbn);
              this.bookList = [];
              console.log(this.bookList.length);
            }
          }
        );
      }
    );

  }

  onRateChanged(rate: number) {
    if ((this.component === 'LivreDone') ) {
      /*
      this.livreService.addBookDoneToUser(this.currentlivre, rate).subscribe(
        res => {console.log(res); console.log("update rating")},
        error => console.log(error)
      );
      */
     this.newRate = rate;
    }
  }

  alire() {
    this.getAllUserBooks();
    this.setPageA(1);
    this.booksToPaged = this.bookList;
    this.component = 'ListeLecture';
    this.alireClasse = this.underline;
    this.livreLusClasse = this.notunderline;
    this.toggle = 1;
  }

  getAllUserDoneBooks() {
    this.showDoneSpinner = true;
    this.livreService.getAllUserDoneBooks().subscribe(
      res => { this.bookListDone = res; },
      error => { console.log(error); },
      () => {
        this.showDoneSpinner = false;
        if ( this.bookListDone.length === 0 ) {
          this.noBooksDone = true;
        } else {
          this.noBooksDone = false;
          this.setPageB(1);
        }
      }
    );
  }

  livreLus() {
    this.getAllUserDoneBooks();
    this.component = 'LivreDone';
    this.booksToPaged = this.bookListDone;
    this.setPageB(1);
    this.alireClasse = this.notunderline;
    this.livreLusClasse = this.underline;
    this.toggle = 2;

  }


  getAllUserBooks() {
    if (this.bookList.length === 0) {
      this.showLittleSpinner = true;
    }
     this.livreService.getAllUserBooks().subscribe(
       res => { this.bookList = res; },
       err => { console.log(err);
         this.showSpinner = true;
         this.noBooks = false;
         setTimeout(() => {
           this.showSpinner = false;
           this.serverDown = true;
           this.noBooks = false;
           console.log(this.showSpinner + 'showSpinner');
           console.log(this.serverDown + ' server down');
          }, 500);
       },
       () => { if (this.bookList.length !== 0) {
         this.setPageA(1);
         this.showSpinner = false;
       } else {
         this.showSpinner = false;
        this.serverDown = false;
         this.noBooks = true;
       }
       this.showLittleSpinner = false;

      }
     );
  }

onBookRemoved(isbn: any) {
  if ( this.component === 'ListeLecture') {
  this.livreService.removeBookFromUser(isbn).subscribe(
    res => { console.log('removed'); },
    err => console.log(err),
    () => {
      this.getAllUserBooks();
    }
  );
  }

  if ( this.component === 'LivreDone' ) {
    this.livreService.removeDoneBookFromUser(isbn).subscribe(
      res => {},
      err => console.log(err),
      () => {
        this.getAllUserDoneBooks();
        this.challengeService.getAllDefis().subscribe(
          resu => { this.challengesList = resu; },
          err => {},
          () => {

            this.userService.getBookDoneCount(this.email).subscribe(
              res => {
                this.challengesList.forEach(element => {

                  if ( element.nbreTotalLivre > res ) {
                    console.log(res);
                    console.log(element.nbreTotalLivre);
                    this.challengeService.deleteUserChallenge(element.nbreTotalLivre, this.email).subscribe(
                      resultat => {
                        console.log(' deleted Challenge ' + resultat);
                      },
                      error => console.log(error)
                    );
                  }
                });
               }
            );
          }
        );

      }
    );
  }

}

getListBooksToPassPager(): Livre[] {
  if (this.component === 'livreDone') {
    console.log('done');
    return this.bookListDone;
  } else if ( this.component === 'ListeLecture') {
    console.log('à lire');

    return this.bookList;
  }
}

}
