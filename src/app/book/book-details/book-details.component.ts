import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/models/book';
import { BookService } from 'src/services/book.service';

@Component({
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  bookId: number = 0;
  isLoading = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });

    this.bookService.getBookDetailsById(this.bookId).subscribe((book: Book) => {
      this.book = book;
      this.isLoading = false;
    });
  }

  onBack() {
    this.location.back();
  }
}
