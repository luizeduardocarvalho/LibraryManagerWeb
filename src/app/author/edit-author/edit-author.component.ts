import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IEditAuthor } from 'src/models/authors/edit-author';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss'],
})
export class EditAuthorComponent implements OnInit {
  editForm = new FormGroup({
    name: new FormControl(''),
  });

  isLoading = false;
  authorId: number = 0;
  author?: GetAuthor;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.authorId = params['id'];
    });

    this.isLoading = true;
    this.authorService.getAuthorById(this.authorId).subscribe(
      (author: GetAuthor) => {
        this.isLoading = false;
        this.editForm.controls['name'].setValue(author.name);
        this.author = author;
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onSubmit(data: any) {
    let author = data.value as IEditAuthor;
    author.id = this.authorId;

    this.isLoading = true;
    this.authorService.edit(author).subscribe(
      (res: any) => {
        this.router
          .navigate(['/authors'], { queryParams: { name: author.name } })
          .then(() => {
            this.isLoading = false;
            this.toastrService.success(
              `Author ${author.name} has been updated.`,
              'Success!'
            );
          });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }
}
