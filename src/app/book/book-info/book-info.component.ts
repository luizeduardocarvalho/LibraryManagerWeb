import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookDetails } from 'src/models/book-details';
import { GetBook } from 'src/models/get-book';
import { Transaction } from 'src/models/transaction';
import { BookService } from 'src/services/book.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit {
  bookId: number = 0;
  book?: BookDetails;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });

    this.getBooks();
  }

  ngOnChanges(): void {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBookById(this.bookId).subscribe((book: BookDetails) => {
      this.book = new BookDetails(
        book.bookId,
        book.title,
        book.description,
        book.transactions
      );
    });
  }

  onReturn() {
    let getBook = new GetBook(this.bookId);
    this.bookService.returnBook(getBook).subscribe(
      (updatedTransaction: Transaction) => {
        if (updatedTransaction.transactionId != 0) {
          this.book?.setTransaction(updatedTransaction);
          this.toastService.show('Book returned!', 'Success!', false);
        }
      },
      (err: any) => this.toastService.show(err.error, 'Error', true)
    );
  }

  onRenew() {
    let getBook = new GetBook(this.bookId);
    this.bookService.renewBook(getBook).subscribe(
      (updatedTransaction: Transaction) => {
        if (updatedTransaction != null) {
          this.book?.setTransaction(updatedTransaction);
          this.toastService.show('Book renewed!', 'Success!', false);
        }
      },
      (err: any) => this.toastService.show(err.error, 'Error', true)
    );
  }

  onBack() {
    this.location.back();
  }
}