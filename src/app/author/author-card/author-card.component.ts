import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorWithBooks } from 'src/models/author-books';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss'],
})
export class AuthorCardComponent implements OnInit {
  author?: AuthorWithBooks;
  authorId: number = 0;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authorId = params['id'];
    });

    this.authorService
      .getAuthorWithBooksById(this.authorId)
      .subscribe((author: AuthorWithBooks) => {
        this.author = author;
      });
  }

  onBack() {
    let state: any = this.location.getState();
    if (state.search != undefined) {
      console.log(state);
      this.router.navigate(['/authors'], {
        queryParams: { name: state.search },
      });
    } else {
      this.location.back();
    }
  }
}
