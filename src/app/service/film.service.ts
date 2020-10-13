import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../model/film';
import {ApiResponse} from '../model/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  swApiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {
  }

  getAllFilms(): Observable<ApiResponse<Film>> {
    const allFilmsUrl = this.swApiUrl + '/films/';
    return this.http.get<ApiResponse<Film>>(allFilmsUrl);
  }

  getFilm(filmUrl: string): Observable<Film> {
    return this.http.get<Film>(filmUrl);
  }
}
