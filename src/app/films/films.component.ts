import {Component, OnInit} from '@angular/core';
import {Film} from '../model/film';
import {FilmService} from '../service/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  allMovies: Array<Film> = [];

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    for (let id = 1; id <= 6; id++) {
      this.filmService.getFilm(id).subscribe(response => {
        this.allMovies.push(response);
        this.sortBy('release_date');
      });
    }
  }

  sortBy(type: string): void {
    if (type === 'episode_id') {
      this.allMovies.sort((f1: Film, f2: Film) => {
        return f1[type] - f2[type];
      });
    } else {
      this.allMovies.sort((f1: Film, f2: Film) => {
        return f1[type].localeCompare(f2[type]);
      });
    }
  }
}
