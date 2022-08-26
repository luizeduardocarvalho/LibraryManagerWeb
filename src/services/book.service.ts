import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/models/book';
import { BookDetails } from 'src/models/book-details';
import { ErrorHandlerHelper } from './error-handler';
import { Transaction } from 'src/models/transaction';
import { GetBook } from 'src/models/get-book';
import { LendBook } from 'src/models/lend-book';
import { baseUrl } from 'settings';
import { CreateBook } from 'src/models/create-book';
import { UpdateBook } from 'src/models/update-book';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.tokenService.getToken()}`,
    }),
  };

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl + 'books', {
      params: { title: title },
      headers: this.httpOptions.headers,
    });
  }

  getBookById(bookId: number): Observable<BookDetails> {
    return this.http.get<BookDetails>(baseUrl + 'books/getbookbyid', {
      params: { bookId: bookId },
      headers: this.httpOptions.headers,
    });
  }

  getBookDetailsById(bookId: number): Observable<Book> {
    return this.http.get<Book>(baseUrl + 'books/getbookdetails', {
      params: { id: bookId },
      headers: this.httpOptions.headers,
    });
  }

  returnBook(book: GetBook): Observable<Transaction> {
    return this.http.post<Transaction>(
      baseUrl + 'books/return',
      book,
      this.httpOptions
    );
  }

  renewBook(getBook: GetBook): Observable<Transaction> {
    return this.http.patch<Transaction>(
      baseUrl + 'books/renew',
      getBook,
      this.httpOptions
    );
  }

  lendBook(lendBook: LendBook) {
    return this.http.post<LendBook>(
      baseUrl + 'books/lend',
      lendBook,
      this.httpOptions
    );
  }

  createBook(book: CreateBook) {
    return this.http.post<CreateBook>(
      baseUrl + 'books/create',
      book,
      this.httpOptions
    );
  }

  updateBook(book: UpdateBook) {
    return this.http.patch<CreateBook>(
      baseUrl + 'books/updatebook',
      book,
      this.httpOptions
    );
  }
}
