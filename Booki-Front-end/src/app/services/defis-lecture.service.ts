import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../domain/Challenge';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefisLectureService {
  URL_BASE = environment.apiBaseUrl;
  URL_DEFIS = '/defislecture';
  URL_USER_DEFIS = '/getAllUserChallenges';
  URL_ADD_CHALLENGE = '/addChallengeToUSer';
  URL_DELETE_CHALLENGE = '/deleteChallengeFromUser';

  constructor(private http: HttpClient) { }

getAllDefis(): Observable<Challenge[]> {
  return <Observable<Challenge[]>>this.http.get(this.URL_BASE + this.URL_DEFIS);
}

deleteUserChallenge(nbTotalLivre: number, email: string): Observable<boolean> {
  let params = new HttpParams();
  params = params.append('email', email);
  params = params.append('nbBook', '' + nbTotalLivre);
  return <Observable<boolean>>this.http.post(this.URL_BASE + this.URL_DEFIS + this.URL_DELETE_CHALLENGE, {}, { params : params});

}

getAllUserDefis(email: string): Observable<Challenge[]> {
  let params = new HttpParams();
  params = params.append('email', email);
  return <Observable<Challenge[]>>this.http.get(this.URL_BASE + this.URL_DEFIS + this.URL_USER_DEFIS, { params: params});

}

addDefisToUser(challengeNbBook: number, email: string ) {
  const addBody = {
    'email': email,
    'nbBook': challengeNbBook
  } ;
  return <Observable<any>>this.http.post(this.URL_BASE + this.URL_DEFIS + this.URL_ADD_CHALLENGE, addBody);
}

}
