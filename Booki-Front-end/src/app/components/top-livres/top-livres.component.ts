import { Component, OnInit } from '@angular/core';
import { Livre } from 'src/app/domain/livre';
import { LivresService } from 'src/app/services/livres.service';
import { LivrePipe } from 'src/app/pipes/livre.pipe';
import { ThrowStmt } from '@angular/compiler';
import { PagerService } from 'src/app/services/pager.service';

@Component({
  selector: 'app-top-livres',
  templateUrl: './top-livres.component.html',
  styleUrls: ['./top-livres.component.scss']
})
export class TopLivresComponent implements OnInit {
  public serverDown = false;
  public showSpinner = false;
  public noBooks = false;
  public bookList: Livre[] = [];
  public searchText: string;
  public filtredBooks: Livre[] = [];
/* Pager
      Service */

// pager object
pager: any = {};

// paged items
pagedItems: any[];


  constructor(private livreService: LivresService, private livrePipe: LivrePipe, private pagerService: PagerService) { }
  ngOnInit() {
   //   this.bookList = this.livreService.getAllBooks();
   this.showSpinner = true;
   this.noBooks = false;
    this.livreService.getAllBooks().subscribe(
      result => { console.log(result); this.bookList = result;
      },
      error => { console.log('Exception getting Books', error);
      this.showSpinner = true;
      this.noBooks = false;

      setTimeout(() => {
        this.showSpinner = false;
        this.serverDown = true;
        this.noBooks = false;
        console.log(this.showSpinner + 'showSpinner');
        console.log(this.serverDown + ' server down');
       }, 1000);
    },
        () => { this.filtredBooks = this.getFilteredBooks();
         // this.listLivreIsEmpty();
         if ( this.filtredBooks.length !== 0 ) {
           this.setPage(1);
           this.showSpinner = false;
          this.noBooks = false;
         } else {
          this.noBooks = true;
         }
        }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.filtredBooks.length, page);

    // get current page of items
    this.pagedItems = this.filtredBooks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
  }, 8);
}

/*
  listLivreIsEmpty() {
    if (this.filtredBooks.length === 0) {
      this.showSpinner = true;
      setTimeout(function() {
       this.showSpinner = false;
       this.serverDown = true;
      }, 5000);
    } else {
      this.showSpinner = false;
      this.serverDown = false;
    }
  }
*/
  getFilteredBooks(): Livre[] {
    return this.livrePipe.transform(this.bookList, this.searchText);
  }

  changeText() {
    this.filtredBooks = this.getFilteredBooks();
    if (this.filtredBooks.length === 0) {
      this.noBooks = true;
    }
  }

  getSearchText(event: any) {
    this.searchText = event;
    this.filtredBooks = this.getFilteredBooks();
    this.setPage(1);
    if (this.filtredBooks.length === 0) {
      this.noBooks = true;
    } else {
      this.noBooks = false;
    }
    console.log(this.noBooks);

  }


  onBookRemoved(isbn: any) {
    console.log('listened');
    console.log(isbn);
    this.livreService.removeBookFromUser(isbn).subscribe(
      res => console.log('removed : ' + res),
      err => console.log(err)
    );
  }

}
