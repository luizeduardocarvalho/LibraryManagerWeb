import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { GetAuthor } from 'src/models/get-author';

@Component({
  selector: 'app-modal-select',
  templateUrl: './modal-select.component.html',
  styleUrls: ['./modal-select.component.scss'],
})
export class ModalSelectComponent implements OnInit {
  title: string = '';
  buttonAction: string = '';
  action = new Subject<any>();
  searchText: string = '';
  id: string = '';
  author?: GetAuthor;
  authors: GetAuthor[] = [];
  filteredAuthors: GetAuthor[] = [];

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    this.filteredAuthors = this.authors;
    this.id = this.filteredAuthors[0].authorId.toString();
    this.author = this.filter(this.id);
  }

  changeAuthor(event: any) {
    if (event == '') {
      this.filteredAuthors = this.authors;
    }

    this.filteredAuthors = this.authors.filter((item) => {
      let normalizedName = item.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      let normalizedSearchText = this.searchText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      return normalizedName.includes(normalizedSearchText);
    });

    this.id = this.filteredAuthors[0].authorId.toString();
    this.author = this.filter(this.id);
  }

  selectAuthor(event: any) {
    this.id = event.target.value;
    this.author = this.filter(this.id);
  }

  filter(id: string): GetAuthor {
    let result = this.filteredAuthors.filter(
      (author) => author.authorId.toString() == id
    );

    return result[0];
  }

  act() {
    this.modalRef.hide();
    this.action.next(this.author);
  }
}
