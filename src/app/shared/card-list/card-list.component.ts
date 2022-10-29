import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from 'src/models/shared/card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent {
  @Input() cards: ICard[] = [];
  @Input() searchText: string = '';
  @Input() isLoading: boolean = false;
  @Output() openModalEvent = new EventEmitter<string>();

  constructor() {}

  openEvent(event: any) {
    this.openModalEvent.emit(event);
  }
}
