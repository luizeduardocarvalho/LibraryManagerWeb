import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';

@Component({
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authors: GetAuthor[] = [];
  searchText: string = '';
  isLoading = false;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['name'];
    });

    this.search(this.searchText);
  }

  search(searchText: any) {
    this.isLoading = true;
    this.authorService
      .getAuthorsByName(searchText)
      .subscribe((authors: GetAuthor[]) => {
        this.authors = authors;
        this.isLoading = false;
      });
  }
}
