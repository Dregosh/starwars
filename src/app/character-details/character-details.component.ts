import { Component, OnInit } from '@angular/core';
import {CharacterService} from '../service/character.service';
import {Character} from '../model/character';
import {FilmService} from '../service/film.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  UrlSubstringIndex = 21;
  character: Character = null;
  filmsButtonLabel = 'Show films';

  filmsTable: Array<{ filmLink: string, title: string}> = [];
  showFilmsTable: boolean = false;

  constructor(private charService: CharacterService,
              private filmService: FilmService,
              private location: Location) { }

  ngOnInit(): void {
    const selectedCharUrl = history.state.data;
    this.charService.getCharacter(selectedCharUrl.slice(this.UrlSubstringIndex))
      .subscribe(result => {
        this.character = result;
        for (const filmLink of this.character.films) {
          this.filmsTable.push({filmLink, title: null});
        }
      });
  }

  toggleFilms(): void {
    this.filmsButtonLabel === 'Show films' ?
      this.filmsButtonLabel = 'Hide films' :
      this.filmsButtonLabel = 'Show films';
    this.showFilmsTable = !this.showFilmsTable;
  }

  getFilm(tableIndex: number): void {
    if (this.filmsTable[tableIndex].title == null) {
      const filmLink =
        this.filmsTable[tableIndex].filmLink.slice(this.UrlSubstringIndex);
      this.filmService.getFilm(filmLink).subscribe(response => {
        this.filmsTable[tableIndex].title = response.title;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
