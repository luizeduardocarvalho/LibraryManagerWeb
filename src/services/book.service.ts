import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from 'src/models/book';
import { BookDetails } from 'src/models/book-details';
import { CreateBook } from 'src/models/create-book';
import { GetBook } from 'src/models/get-book';
import { LendBook } from 'src/models/lend-book';
import { Transaction } from 'src/models/transaction';
import { UpdateBook } from 'src/models/update-book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(environment.baseUrl + 'books', {
      params: { title: title },
    });
  }

  getBookById(bookId: number): Observable<BookDetails> {
    return this.http.get<BookDetails>(
      environment.baseUrl + 'books/getbookbyid',
      {
        params: { bookId: bookId },
      }
    );
  }

  getBookDetailsById(bookId: number): Observable<Book> {
    return this.http.get<Book>(environment.baseUrl + 'books/getbookdetails', {
      params: { id: bookId },
    });
  }

  returnBook(book: GetBook): Observable<Transaction> {
    return this.http.post<Transaction>(
      environment.baseUrl + 'books/return',
      book
    );
  }

  renewBook(getBook: GetBook): Observable<Transaction> {
    return this.http.patch<Transaction>(
      environment.baseUrl + 'books/renew',
      getBook
    );
  }

  lendBook(lendBook: LendBook) {
    return this.http.post<LendBook>(
      environment.baseUrl + 'books/lend',
      lendBook
    );
  }

  createBook(book: CreateBook) {
    return this.http.post<CreateBook>(
      environment.baseUrl + 'books/create',
      book
    );
  }

  updateBook(book: UpdateBook) {
    return this.http.patch<CreateBook>(
      environment.baseUrl + 'books/updatebook',
      book
    );
  }
}
