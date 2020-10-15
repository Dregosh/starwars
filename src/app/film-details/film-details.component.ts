import {Component, OnInit} from '@angular/core';
import {Film} from '../model/film';
import {FilmService} from '../service/film.service';
import {CharacterService} from '../service/character.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  individualUrlSubstringIndex = 21;
  film: Film = null;
  charactersButtonLabel = 'Show characters';

  charactersTable: Array<{ characterLink: string, name: string }> = [];
  showCharsTable: boolean = false;

  constructor(private filmService: FilmService,
              private characterService: CharacterService,
              private location: Location) {
  }

  ngOnInit(): void {
    const selectedMovieUrl = history.state.data;
    // const selectedMovieUrl = 'http://swapi.dev/api/films/6/';
    this.filmService.getFilm(selectedMovieUrl.slice(this.individualUrlSubstringIndex))
      .subscribe(result => {
      this.film = result;
      for (const characterLink of this.film.characters) {
        this.charactersTable.push({characterLink, name: null});
      }
    });
  }

  toggleCharacters(): void {
    this.charactersButtonLabel === 'Show characters' ?
      this.charactersButtonLabel = 'Hide characters' :
      this.charactersButtonLabel = 'Show characters';
    this.showCharsTable = !this.showCharsTable;
  }

  getCharacter(tableIndex: number): void {
    if (this.charactersTable[tableIndex].name == null) {
      const charLink = this.charactersTable[tableIndex].characterLink
        .slice(this.individualUrlSubstringIndex);
      this.characterService.getCharacter(charLink)
        .subscribe(response => {
          this.charactersTable[tableIndex].name = response.name;
        });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
