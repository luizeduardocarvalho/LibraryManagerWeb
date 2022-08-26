import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from 'src/models/book-details';
import { UpdateBook } from 'src/models/update-book';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  book?: BookDetails;
  createForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  bookId: number = 0;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });

    this.bookService.getBookById(this.bookId).subscribe((book: BookDetails) => {
      this.book = book;

      this.createForm = new FormGroup({
        title: new FormControl(this.book?.title),
        description: new FormControl(this.book?.description),
      });
    });
  }

  onSubmit(data: any): void {
    let book = data.value as UpdateBook;
    book.id = this.bookId;
    this.bookService.updateBook(book).subscribe();
    window.location.href = `/books?title=${book.title}`;
  }

  onBack() {
    this.location.back();
  }
}
