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

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    let book = data.value as CreateBook;
    let error = false;
    this.bookService.createBook(book).subscribe((err: any) => error = true);

    this.router.navigate(['/books'], { queryParams: { title: book.title } }).then(() => {
      this.toastService.show('The book was created successfully ', {
        classname: error ? 'bg-success text-light' : 'bg-success text-light',
        delay: 5000,
        autohide: true,
        headertext: error ? 'Error!' : 'Success!'
      });
    })
  }

  onBack() {
    this.location.back();
  }
}
