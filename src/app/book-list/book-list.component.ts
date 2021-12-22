import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books = [
    {
      id: 1,
      title: 'Book 1',
      status: true
    },
    {
      id: 2,
      title: 'Book 2',
      status: true
    },
    {
      id: 3,
      title: 'Book 3',
      status: false
    },
    {
      id: 4,
      title: 'Book 4',
      status: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
