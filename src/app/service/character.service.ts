import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../model/character';
import { ApiResponse } from '../model/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private swApiRootUrl = 'https://swapi.dev/api/';

  constructor(private httpClient: HttpClient) {}

  getTenCharsBatch(pageNo: number): Observable<ApiResponse<Character>> {
    const pageUrl = this.swApiRootUrl + 'people/?page=' + pageNo;
    return this.httpClient.get<ApiResponse<Character>>(pageUrl);
  }

  getCharacter(charUrl: string): Observable<Character> {
    return this.httpClient.get<Character>(this.swApiRootUrl + charUrl);
  }
}
