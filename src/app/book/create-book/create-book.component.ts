import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateBook } from 'src/models/create-book';
import { BookService } from 'src/services/book.service';

@Component({
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  createForm = new FormGroup({
    reference: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    authorId: new FormControl(''),
  });

  constructor(
    private bookService: BookService,
    private location: Location,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  isLoading = false;

  ngOnInit(): void {}

  onSubmit(data: any): void {
    this.isLoading = true;
    let book = data.value as CreateBook;
    this.bookService.createBook(book).subscribe(
      (res: any) => {
        this.router
          .navigate(['/books'], { queryParams: { title: book.title } })
          .then(() => {
            this.isLoading = false;
            this.toastrService.success(
              `Book ${book.title} has been created.`,
              'Success!'
            );
          });
      },
      (err) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }

  onClear() {
    this.createForm.reset();
  }
}
