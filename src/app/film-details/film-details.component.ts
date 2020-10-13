import {Component, OnInit} from '@angular/core';
import {Film} from '../model/film';
import {FilmService} from '../service/film.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  film: Film = null;
  charactersButtonLabel = 'Show actors';
  charactersTable: Array<{ characterLink: string, name: string }> = [];
  showCharsTable: boolean = false;

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    const selectedMovieUrl = history.state.data;
    this.filmService.getFilm(selectedMovieUrl).subscribe(result => {
      this.film = result;
      for (const characterLink of this.film.characters) {
        this.charactersTable.push({characterLink, name: null});
      }
    });
  }

  toggleCharacters(): void {
    this.charactersButtonLabel === 'Show actors' ? this.charactersButtonLabel = 'Hide actors' :
      this.charactersButtonLabel = 'Show actors';
    this.showCharsTable = !this.showCharsTable;
  }
}
