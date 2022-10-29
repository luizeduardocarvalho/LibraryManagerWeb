import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorWithBooks } from 'src/models/author-books';
import { ICard } from 'src/models/shared/card';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  author?: AuthorWithBooks;
  bookListCards: ICard[] = [];
  authorId: number = 0;
  isLoading = false;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.route.params.subscribe((params) => {
      this.authorId = params['id'];
    });

    this.authorService
      .getAuthorWithBooksById(this.authorId)
      .subscribe((author: AuthorWithBooks) => {
        this.author = author;
        this.bookListCards = author.books.map((book) => ({
          id: book.bookId.toString(),
          name: `${book.reference} - ${book.title}`,
          bodyContent: [],
          buttons: [
            {
              actionUrl: `/books/${book.bookId}`,
              icon: 'book',
              label: 'Info',
            },
            {
              actionUrl: `/book/${book.bookId}/update`,
              icon: 'edit',
              label: 'Edit',
            },
          ],
        }));

        this.isLoading = false;
      });
  }

  onBack() {
    let state: any = this.location.getState();
    if (state.search != undefined) {
      this.router.navigate(['/authors'], {
        queryParams: { name: state.search },
      });
    } else {
      this.location.back();
    }
  }
}
