import { Component, OnInit } from '@angular/core';
import { Character } from '../model/character';
import { CharacterService } from '../service/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  currentPageNo: number = 1;
  allItems: Array<Character> = [];
  prevPageUrl: string = null;
  nextPageUrl: string = null;
  selectedSorting: string = 'name';

  sortingOptions = [
    { property: 'name', name: 'Name' },
    { property: 'birth_year', name: 'Birth Year' },
    { property: 'gender', name: 'Gender' },
  ];

  constructor(private charService: CharacterService) {}

  ngOnInit(): void {
    this.getTenCharsBatch(this.currentPageNo.toString());
  }

  sortBy(type: string): void {
    if (this.selectedSorting === type) {
      this.allItems.reverse();
    } else {
      this.allItems.sort((f1: Character, f2: Character) => {
        return f1[type].localeCompare(f2[type]);
      });
    }
    this.selectedSorting = type;
  }

  getTenCharsBatch(pageUrl: string): void {
    this.currentPageNo = +pageUrl.slice(pageUrl.length - 1);
    this.charService
      .getTenCharsBatch(this.currentPageNo)
      .subscribe((response) => {
        this.allItems = response.results;
        this.prevPageUrl = response.previous;
        this.nextPageUrl = response.next;
      });
  }
}
