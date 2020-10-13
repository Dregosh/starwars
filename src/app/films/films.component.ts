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
  selectedSorting: string = 'release_date';

  sortingOptions = [
    {property: 'title', name: 'Title'},
    {property: 'director', name: 'Director'},
    {property: 'release_date', name: 'Release date'},
    {property: 'episode_id', name: 'Ep. ID'}
  ];

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
    this.filmService.getAllFilms().subscribe(response => {
      this.allMovies = response.results;
    });
  }

  sortBy(type: string): void {
    if (this.selectedSorting === type) {
      this.allMovies.reverse();
    } else if (type === 'episode_id') {
      this.allMovies.sort((f1: Film, f2: Film) => {
        return f1[type] - f2[type];
      });
    } else {
      this.allMovies.sort((f1: Film, f2: Film) => {
        return f1[type].localeCompare(f2[type]);
      });
    }
    this.selectedSorting = type;
  }
}
