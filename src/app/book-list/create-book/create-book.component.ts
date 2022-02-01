import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBook } from 'src/models/create-book';
import { BookService } from 'src/services/book.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  createForm = new FormGroup({
    reference: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    authorId: new FormControl('')
  });

  constructor(
    private bookService: BookService,
    private location: Location,
    private toastService: ToastService,
    private router: Router) { }

  error: boolean = false;

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    let book = data.value as CreateBook;
    this.bookService.createBook(book).subscribe(
      err => console.log(err),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if(this.error) {
          this.redirect('Error', 'An error has occurred.', book.title, this.error);
        }
        else {
          this.redirect('Success!', `Created book ${book.title}.`, book.title, this.error);
        }
      });
  }

  onBack() {
    this.location.back();
  }

  redirect(header: string, text: string, bookTitle: string, error: boolean) {
    this.router.navigate(['/books'], { queryParams: { title: bookTitle } }).then(() => {
      this.toastService.show(text, header, error);
    });
  }
}
