import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Book } from 'src/models/book';

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

	baseUrl = 'https://localhost:5001/';

  getBooksByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl + 'books/GetBooksByTitle',
    {
      params: {
          'title': title
      }
    });
  }
}
