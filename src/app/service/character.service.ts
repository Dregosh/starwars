import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Character} from '../model/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private swApiRootUrl = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient) { }

  getCharacter(charUrl: string): Observable<Character> {
    return this.httpClient.get<Character>(this.swApiRootUrl + charUrl);
  }
}
