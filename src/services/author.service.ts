import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorWithBooks } from 'src/models/author-books';
import { IEditAuthor } from 'src/models/authors/edit-author';
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

  getSimpleAuthors(): Observable<GetAuthor[]> {
    return this.http.get<GetAuthor[]>(
      environment.baseUrl + 'authors/getsimpleauthors'
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

  edit(author: IEditAuthor): Observable<IEditAuthor> {
    return this.http.put<IEditAuthor>(environment.baseUrl + 'authors', author);
  }

  getAuthorById(id: number): Observable<GetAuthor> {
    return this.http.get<GetAuthor>(
      environment.baseUrl + 'authors/getauthorbyid',
      { params: { id } }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.baseUrl + 'authors', {
      params: { id },
    });
  }
}
