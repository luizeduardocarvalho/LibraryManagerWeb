import { Component, HostListener, OnInit } from '@angular/core';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book.service';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchText: string = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void { }

  search(searchText: any) {
    this.bookService.getBooksByTitle(searchText).subscribe((books: Book[]) => {
      this.books = books;
    });
  }
}
