import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from 'src/models/shared/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card!: ICard;
  @Input() icon: string = '';
  @Output() openEvent = new EventEmitter<string>();

  constructor() {}

  openModal(id: string) {
    this.openEvent.emit(id);
  }
}
