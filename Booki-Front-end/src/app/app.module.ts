import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingDevTeamComponent } from './components/landing-dev-team/landing-dev-team.component';
import { LandingFeaturesComponent } from './components/landing-features/landing-features.component';
import { LandingIntroComponent } from './components/landing-intro/landing-intro.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NavbarUserWelcomeComponent } from './components/navbar-user-welcome/navbar-user-welcome.component';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';
import { UserWelcomeContentComponent } from './components/user-welcome-content/user-welcome-content.component';
import { LivreModalComponent } from './components/livre-modal/livre-modal.component';
import { LivreComponent } from './components/livre/livre.component';
import { TopLivresComponent } from './components/top-livres/top-livres.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LivrePipe } from './pipes/livre.pipe';
import { FormsModule } from '@angular/forms';
import { SearchLivreComponent } from './components/search-livre/search-livre.component';
import { ListeLectureComponent } from './components/liste-lecture/liste-lecture.component';
import { BarRatingModule } from 'ngx-bar-rating';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SigninModalComponent } from './components/signin-modal/signin-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupModalComponent } from './components/signup-modal/signup-modal.component';
import { ChallengesListComponent } from './components/challenges-list/challenges-list.component';
import { ChallengeComponent } from './components/challenge/challenge.component';
import { ChallengeModalComponent } from './components/challenge-modal/challenge-modal.component';
import { ChallengeDefaultCardComponent } from './components/challenge-default-card/challenge-default-card.component';
import { ToastrModule } from 'ngx-toastr';
import { Interceptor } from './interceptors/interceptor';
import { SigninPageComponent } from './components/signin-page/signin-page.component';
import { NavbarLoginComponent } from './components/navbar-login/navbar-login.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { ProfileComponent } from './components/profile/profile.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DetailsUploadComponent } from './components/details-upload/details-upload.component';
import { ListUploadComponent } from './components/list-upload/list-upload.component';
import { FormUploadComponent } from './components/form-upload/form-upload.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingDevTeamComponent,
    LandingFeaturesComponent,
    LandingIntroComponent,
    LandingPageComponent,
    NavbarUserWelcomeComponent,
    UserWelcomeComponent,
    UserWelcomeContentComponent,
    LivreModalComponent,
    LivreComponent,
    TopLivresComponent,
    LivrePipe,
    SearchLivreComponent,
    ListeLectureComponent,
    SigninModalComponent,
    NotFoundComponent,
    SignupModalComponent,
    ChallengesListComponent,
    ChallengeComponent,
    ChallengeModalComponent,
    ChallengeDefaultCardComponent,
    SigninPageComponent,
    NavbarLoginComponent,
    ProfileComponent,
    DetailsUploadComponent,
    ListUploadComponent,
    FormUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PasswordStrengthMeterModule,
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MDBBootstrapModule.forRoot(),
    BarRatingModule,

    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    LivrePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
