import { Component, OnInit } from '@angular/core';
import { Challenge } from 'src/app/domain/Challenge';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { DefisLectureService } from 'src/app/services/defis-lecture.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-challenges-list',
  templateUrl: './challenges-list.component.html',
  styleUrls: ['./challenges-list.component.scss']
})
export class ChallengesListComponent implements OnInit {
  public underline = 'underline';
  public notunderline = 'notunderline';
  public component = 'ChallengesDone';
  public alireClasse = this.underline;
  public toggle = 1;
  public showSpinner = true;
  public nbreLivreDone = 0;
  public nbreTotalLivre = 10;
  public livreLusClasse = this.notunderline;
  public noAchievedChallenges = false ;
  public serverDown = false;
  private email;
  public challengesList: Challenge[] = [];
  public challengesDone: Challenge[] = [];
    constructor(private toastrService: ToastrService,
      private userService: UtilisateurService, private challengeService: DefisLectureService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.userService.getBookDoneCount(this.email).subscribe(
      res => {this.nbreLivreDone = res;  },
      err => { console.log(err); },
      () => {
       this.getAllChallengesDone();
        this.getAllChallenges();
      }
    );


  }

  getAllChallenges() {
    this.challengeService.getAllDefis().subscribe(
      res => {
       this.challengesList = res;
      },
      err => { console.log(err); },
      () => {
        this.showSpinner = false;
        if (this.challengesList.length === 0) {
          this.serverDown = true;
        } else {
          this.serverDown = false;
        }
      }
    );
  }

  getAllChallengesDone() {
    this.challengeService.getAllUserDefis(this.email).subscribe(
      res => {
        console.log(res);
        this.challengesDone = res;
      },
      err => { console.log(err); },
      () => {
        if ( this.challengesDone.length === 0 ) {
          this.noAchievedChallenges = true;
        } else {
          this.noAchievedChallenges = false;

        }
      }
    );
  }



  alire() {
    // this.getAllUserBooks();
    this.component = 'ChallengesDone';
    this.alireClasse = this.underline;
    this.livreLusClasse = this.notunderline;
    this.toggle = 1;
  }

  livreLus() {
   // this.getAllUserDoneBooks();
    this.component = 'AllChallenges';
    this.alireClasse = this.notunderline;
    this.livreLusClasse = this.underline;
    this.toggle = 2;

  }



}
