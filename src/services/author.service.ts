import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'settings';
import { GetAuthor } from 'src/models/get-author';
import { AuthorWithBooks } from 'src/models/author-books';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class AuthorService {

	constructor(private http: HttpClient) { }

	getAuthorsByName(name: string): Observable<GetAuthor[]> {
		return this.http.get<GetAuthor[]>(baseUrl + 'authors/getauthorsbyname',
			{
				params: {
					'authorName': name
				}
			});
	}

	createAuthor(author: GetAuthor) {
    return this.http.post<GetAuthor>(baseUrl + 'authors/create', author);
  }

	getAuthorWithBooksById(authorId: number): Observable<AuthorWithBooks> {
		return this.http.get<AuthorWithBooks>(baseUrl + 'authors/getauthorwithbooksbyid',
		{
			params: {
				'authorId': authorId
			}
		});
	}
}
