import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('')
  });

  error: boolean = false;

  constructor(
    private authorService: AuthorService, 
    private toastService: ToastService, 
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let author = this.createForm.value as GetAuthor;
    this.authorService.createAuthor(author).subscribe(
      err => console.log(err),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        }
        else {
          this.redirect('Success!', `Author created.`, this.error);
        }
      });
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/authors']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
