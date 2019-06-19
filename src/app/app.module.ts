import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule,
  AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoginComponent } from './components/login/login.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { SkillsComponent } from './components/skills/skills.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CacheService } from './services/api/cache.service';
import { CachingInterceptor } from './services/api/cache-interceptor.service';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TopTeamsComponent } from './components/top-teams/top-teams.component';
import { ViewTeamComponent } from './components/view-team/view-team.component';
import { MyTeamsComponent } from './components/my-teams/my-teams.component';

const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider("147139943087-ekgams3d2og11u1g6i9kqf96pt4pmmiv.apps.googleusercontent.com")
}]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokedexComponent,
    SkillsComponent,
    NavbarComponent,
    CreateTeamComponent,
    TopTeamsComponent,
    ViewTeamComponent,
    MyTeamsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocialLoginModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: AuthServiceConfig, useFactory: provideConfig },
    CacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
