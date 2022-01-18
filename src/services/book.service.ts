import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/models/book';
import { BookDetails } from 'src/models/book-details';
import { ErrorHandlerHelper } from './error-handler';
import { Transaction } from 'src/models/transaction';
import { GetBook } from 'src/models/get-book';
import { LendBook } from 'src/models/lend-book';
import { baseUrl } from 'settings';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }


  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl + 'books/GetBooksByTitle', {
      params: {
          'title': title
      }
    });
  }

  getBookById(bookId: number): Observable<BookDetails> {
    return this.http.get<BookDetails>(baseUrl + 'books/getbookbyid', {
      params: {
        'bookId': bookId
      }
    })
  }

  returnBook(book: GetBook): Observable<Transaction> {
    return this.http.post<Transaction>(baseUrl + 'books/return', book, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }

  renewBook(getBook: GetBook): Observable<Transaction> {
    return this.http.patch<Transaction>(baseUrl + 'books/renew', getBook, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }

  lendBook(lendBook: LendBook) {
    return this.http.post<LendBook>(baseUrl + 'books/lend', lendBook, httpOptions).pipe(
      catchError(ErrorHandlerHelper.handleError)
    );
  }
}
