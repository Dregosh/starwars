import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Film} from '../model/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  swApiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {
  }

  getFilm(id: number): Observable<Film> {
    const filmUrl = this.swApiUrl + '/films/' + `${id}/`;
    return this.http.get<Film>(filmUrl);
  }
}
