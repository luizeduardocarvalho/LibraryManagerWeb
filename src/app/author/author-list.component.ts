import { Component, OnInit } from '@angular/core';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

  authors: GetAuthor[] = [];
  searchText: string = '';

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void { }

  search(searchText: any) {
    this.authorService.getAuthorsByName(searchText).subscribe((authors: GetAuthor[]) => {
      this.authors = authors;
    });
  }

}
