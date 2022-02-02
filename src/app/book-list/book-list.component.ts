import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[] = [];
  searchText: string = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchText = params['title'];
    });

    this.getBooks(this.searchText);
  }

  getBooks(title: string) {
    this.bookService.getBooksByTitle(title).subscribe((books: Book[]) => {
      this.books = books;
    });
  }

  search(searchText: string) {
    if(searchText == '') {
      this.books = [];
    }
    else {
      this.getBooks(searchText);
    }
  }
}
