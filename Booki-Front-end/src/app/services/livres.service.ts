import { Injectable } from '@angular/core';
import { Livre } from '../domain/Livre';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LivresService {
  URL_BASE = environment.apiBaseUrl;

  URL_BOOK = '/livres';
  URL_BOOK_DONE = '/booksdone';
  URL_USER = '/utilisateurs';
  URL_USER_BOOKS = '/utilisateurs/getUserBooks';
  URL_ADD_USER_BOOK = '/addBookToUser';
  URL_USER_HAS_BOOK = '/getUserHasBook';
  URL_REMOVE_BOOK = '/deleteBookFromUser';
  URL_ADD_BOOK_DONE = '/addBookDoneToUser';
  URL_REMOVE_BOOK_DONE = '/deleteDoneBookFromUser';
  private bookList: Livre[];
  private user = {
    'username': 'aloulou',
   'email': localStorage.getItem('email')

    };
    public headers = new HttpHeaders();
    constructor(private http: HttpClient) {


   }

  addBookToUser(livre: Livre): Observable<String> {
    const addBody = {
      'user': this.user,
      'livre': livre
    } ;
      return <Observable<String>>this.http.post(this.URL_BASE + this.URL_USER + this.URL_ADD_USER_BOOK, addBody);
  }

  getAllUserBooks(): Observable<Livre[]> {
    let params = new HttpParams();
    params = params.append('email', this.user.email);
    return (<Observable<Livre[]>>this.http.get(this.URL_BASE + this.URL_USER_BOOKS, {  params : params}));
  }


  getAllBooks(): Observable<Livre[]> {


    return (<Observable<Livre[]>>this.http.get(this.URL_BASE + this.URL_BOOK, {
      headers: this.headers
    }));
  }

  userHasBook(isbn: string): Observable<boolean> {
    let params = new HttpParams();

    params = params.append('email', this.user.email);
    params = params.append('isbn', isbn);

    return <Observable<boolean>>this.http.get(this.URL_BASE + this.URL_USER + this.URL_USER_HAS_BOOK, {params: params });
  }



  removeBookFromUser(isbn: string): Observable<boolean> {
    const removeBody = {
      'email': this.user.email,
      'isbn': isbn
    } ;
     return <Observable<boolean>> this.http.post(this.URL_BASE + this.URL_USER + this.URL_REMOVE_BOOK, removeBody);
  }

  removeDoneBookFromUser(isbn: string): Observable<boolean> {
    const removeBody = {
      'email': this.user.email,
      'isbn': isbn
    } ;
     return <Observable<boolean>> this.http.post(this.URL_BASE + this.URL_BOOK_DONE + this.URL_REMOVE_BOOK_DONE, removeBody);
  }

  addBookDoneToUser(livre: Livre, rate: number) {
    const addBody = {
      'user': this.user,
      'livre': livre,
      'rate': rate
    } ;
    return <Observable<Livre>> this.http.post(this.URL_BASE + this.URL_BOOK_DONE + this.URL_ADD_BOOK_DONE, addBody);

  }

  getBookByIsbn(isbn: string) {
    return <Observable<Livre>> this.http.get(this.URL_BASE + this.URL_BOOK + '/' + isbn);

  }


  getAllUserDoneBooks() {
    let params = new HttpParams();
    params = params.append('email', this.user.email);
    return <Observable<any>> this.http.get(this.URL_BASE + this.URL_BOOK_DONE, { params: params});
  }
}
