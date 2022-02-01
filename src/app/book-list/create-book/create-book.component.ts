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

        if (this.error) {
          this.redirect('Error', 'bg-danger text-light', 'An error has occurred.', book.title);
        }
        else {
          this.redirect('Success!', 'bg-success text-light', `The book '${book.title}' was created`, book.title);
        }

      });
  }

  onBack() {
    this.location.back();
  }

  redirect(header: string, classname: string, text: string, bookTitle: string) {
    this.router.navigate(['/books'], { queryParams: { title: bookTitle } }).then(() => {
      this.toastService.show(text, {
        classname: classname,
        delay: 5000,
        autohide: true,
        headertext: header
      });
    });
  }
}
