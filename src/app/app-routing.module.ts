import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { SkillsComponent } from './components/skills/skills.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TopTeamsComponent } from './components/top-teams/top-teams.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ViewTeamComponent } from './components/view-team/view-team.component';

const routes: Routes = [
  {path: '', component: TopTeamsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'create', component: CreateTeamComponent, canActivate: [AuthenticationService]},
  { path: 'view/:id', component: ViewTeamComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
