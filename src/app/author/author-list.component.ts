import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetAuthor } from 'src/models/get-author';
import { ICard } from 'src/models/shared/card';
import { AuthorService } from 'src/services/author.service';

@Component({
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authorCards: ICard[] = [];
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
        this.authorCards = authors.map((author) => ({
          id: author.authorId.toString(),
          name: author.name,
          bodyContent: [],
          buttons: [
            {
              actionUrl: `${author.authorId}`,
              icon: 'user',
              label: 'Info',
            },
          ],
        }));

        this.isLoading = false;
      });
  }
}
