import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { SkillsComponent } from './components/skills/skills.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'skills', component: SkillsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
