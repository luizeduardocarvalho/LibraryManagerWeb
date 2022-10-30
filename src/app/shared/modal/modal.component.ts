import { Component, EventEmitter, Output } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  title: string = '';
  id: string = '';
  buttonAction: string = '';
  body: string = '';
  action = new Subject<any>();

  constructor(public modalRef: MDBModalRef) {}

  act() {
    this.modalRef.hide();
    this.action.next(this.id);
  }
}
