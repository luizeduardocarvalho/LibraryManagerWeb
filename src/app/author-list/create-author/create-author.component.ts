import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('')
  });

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let author = this.createForm.value as GetAuthor;
    this.authorService.createAuthor(author).subscribe();
    window.location.href = '/authors';
  }
  
}
