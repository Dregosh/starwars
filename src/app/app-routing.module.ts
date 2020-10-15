import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {CharactersComponent} from './characters/characters.component';

const routes: Routes = [
  {path: '', redirectTo: '/films', pathMatch: 'full'},
  {path: 'films', component: FilmsComponent},
  {path: 'films/details', component: FilmDetailsComponent},
  {path: 'characters', component: CharactersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
