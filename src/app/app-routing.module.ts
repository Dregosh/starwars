import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FilmsComponent} from './films/films.component';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {CharactersComponent} from './characters/characters.component';
import {CharacterDetailsComponent} from './character-details/character-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/films', pathMatch: 'full'},
  {path: 'films', component: FilmsComponent},
  {path: 'films/details', component: FilmDetailsComponent},
  {path: 'characters', component: CharactersComponent},
  {path: 'characters/details', component: CharacterDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
