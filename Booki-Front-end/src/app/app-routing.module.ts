import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TopLivresComponent } from './components/top-livres/top-livres.component';
import { ListeLectureComponent } from './components/liste-lecture/liste-lecture.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';
import { AuthGuard } from './guards/auth.guard';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginGuard } from './guards/login.guard';
const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]},
    { path: 'login', component: SigninPageComponent, canActivate: [LoginGuard]},
    { path: 'welcome', component: UserWelcomeComponent,
    canActivate: [AuthGuard]
  },
    { path: 'listelectures', component: ListeLectureComponent,
      canActivate: [AuthGuard]
  },
    { path: 'toplivres', component: TopLivresComponent ,
      canActivate: [AuthGuard]
  },
    { path: 'challenges', component: ChallengesListComponent,
      canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
