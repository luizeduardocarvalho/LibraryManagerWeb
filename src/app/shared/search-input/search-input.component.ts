import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
})
export class SearchInputComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();
  searchText: string = '';

  constructor() {}

  ngOnInit(): void {}

  search() {
    this.searchEvent.emit(this.searchText);
  }
}
