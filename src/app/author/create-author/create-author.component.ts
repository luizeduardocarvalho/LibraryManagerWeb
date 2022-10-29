import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
})
export class CreateAuthorComponent implements OnInit {
  createForm = new FormGroup({
    name: new FormControl(''),
  });

  isLoading = false;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private toastrService: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    let author = this.createForm.value as GetAuthor;
    this.authorService.createAuthor(author).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/authors']).then(() => {
          this.toastrService.success('Author created.', 'Success!');
        });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }
}
