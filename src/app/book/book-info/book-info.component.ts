import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDetails } from 'src/models/book-details';
import { GetBook } from 'src/models/get-book';
import { Transaction } from 'src/models/transaction';
import { BookService } from 'src/services/book.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit {
  bookId: number = 0;
  book?: BookDetails;
  isLoading = false;
  isRenewLoading = false;
  isReturnLoading = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.isLoading = true;
    this.bookService.getBookById(this.bookId).subscribe((book: BookDetails) => {
      this.book = new BookDetails(
        book.bookId,
        book.title,
        book.description,
        book.transactions
      );

      if (book.description != null) {
        this.book.description = this.book.description
          .substring(0, 103)
          .trimEnd()
          .concat('...');
      }

      this.isLoading = false;
    });
  }

  onReturn() {
    this.isReturnLoading = true;
    let getBook = new GetBook(this.bookId);
    this.bookService.returnBook(getBook).subscribe(
      (updatedTransaction: Transaction) => {
        if (updatedTransaction.transactionId != 0) {
          this.book?.setTransaction(updatedTransaction);
          this.toastService.show('Book returned!', 'Success!', false);
          this.isReturnLoading = false;
        }
      },
      (err: any) => {
        this.toastService.show(err.error, 'Error', true);
        this.isReturnLoading = false;
      }
    );
  }

  onRenew() {
    this.isRenewLoading = true;
    let getBook = new GetBook(this.bookId);
    this.bookService.renewBook(getBook).subscribe(
      (updatedTransaction: Transaction) => {
        if (updatedTransaction != null) {
          this.book?.setTransaction(updatedTransaction);
          this.toastService.show('Book renewed!', 'Success!', false);
        }

        this.isRenewLoading = false;
      },
      (err: any) => {
        this.toastService.show(err.error, 'Error', true);
        this.isRenewLoading = false;
      }
    );
  }

  onBack() {
    let state: any = this.location.getState();
    if (state.search != undefined) {
      this.router.navigate(['/books'], {
        queryParams: { title: state.search },
      });
    } else {
      this.location.back();
    }
  }
}
