import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { baseUrl } from 'settings';
import { GetAuthor } from 'src/models/get-author';
import { AuthorWithBooks } from 'src/models/author-books';
import { TokenService } from './token.service';


@Injectable({
	providedIn: 'root'
})
export class AuthorService {
	
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `${this.tokenService.getToken()}`
		})
	};

	constructor(private http: HttpClient, private tokenService: TokenService) { }

	getAuthorsByName(name: string): Observable<GetAuthor[]> {
		return this.http.get<GetAuthor[]>(baseUrl + 'authors/getauthorsbyname', 
			{ 
				params: { 'authorName': name },
				headers: this.httpOptions.headers
			});
	}

	createAuthor(author: GetAuthor) {
    return this.http.post<GetAuthor>(baseUrl + 'authors/create', author, this.httpOptions);
  }

	getAuthorWithBooksById(authorId: number): Observable<AuthorWithBooks> {
		return this.http.get<AuthorWithBooks>(baseUrl + 'authors/getauthorwithbooksbyid',
		{
			params: { 'authorId': authorId },
			headers: this.httpOptions.headers
		});
	}
}
