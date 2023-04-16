import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookDetails } from 'src/models/book-details';
import { GetBook } from 'src/models/get-book';
import { ICard } from 'src/models/shared/card';
import { Transaction } from 'src/models/transaction';
import { BookService } from 'src/services/book.service';

@Component({
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss'],
})
export class BookInfoComponent implements OnInit {
  bookId: number = 0;
  book?: BookDetails;
  bookHistoryCards: ICard[] = [];
  isLoading = false;
  isRenewLoading = false;
  isReturnLoading = false;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastrService: ToastrService
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

      this.createTransactionCards(this.book);

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
          this.toastrService.success('Book returned!', 'Success!');
        } else {
          this.toastrService.info('You can lend the book by clicking the button "Lend"', 'The book is already available');
        }
        
        this.isReturnLoading = false;
      },
      (err: any) => (this.isReturnLoading = false)
    );
  }

  onRenew() {
    this.isRenewLoading = true;
    let getBook = new GetBook(this.bookId);
    this.bookService.renewBook(getBook).subscribe(
      (updatedTransaction: Transaction) => {
        if (updatedTransaction != null) {
          this.book?.setTransaction(updatedTransaction);
          this.toastrService.success('Book renewed!', 'Success!');
        }

        this.isRenewLoading = false;
      },
      (err: any) => (this.isRenewLoading = false)
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

  createTransactionCards(book: BookDetails) {
    this.bookHistoryCards = book.transactions.map((transaction) => {
      let creationDate = new Date(transaction.creationDate).toLocaleDateString(
        'en-GB'
      );

      let cards = {
        id: transaction.transactionId.toString(),
        name: transaction.studentName,
        bodyContent: [`Created at: ${creationDate}`],
        buttons: [],
      };

      let returnedAt = '';
      if (transaction.returnedAt) {
        returnedAt = new Date(transaction.returnedAt).toLocaleDateString(
          'en-GB'
        );

        cards.bodyContent.push(`Returned at: ${returnedAt}`);
      }

      return cards;
    });
  }
}
