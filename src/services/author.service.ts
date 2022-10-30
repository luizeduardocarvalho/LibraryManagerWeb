import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorWithBooks } from 'src/models/author-books';
import { GetAuthor } from 'src/models/get-author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthorsByName(name: string): Observable<GetAuthor[]> {
    return this.http.get<GetAuthor[]>(
      environment.baseUrl + 'authors/getauthorsbyname',
      {
        params: { authorName: name },
      }
    );
  }

  createAuthor(author: GetAuthor) {
    return this.http.post<GetAuthor>(
      environment.baseUrl + 'authors/create',
      author
    );
  }

  getAuthorWithBooksById(authorId: number): Observable<AuthorWithBooks> {
    return this.http.get<AuthorWithBooks>(
      environment.baseUrl + 'authors/getauthorwithbooksbyid',
      {
        params: { authorId: authorId },
      }
    );
  }
}
