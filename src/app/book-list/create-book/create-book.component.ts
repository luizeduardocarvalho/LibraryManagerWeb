import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateBook } from 'src/models/create-book';
import { BookService } from 'src/services/book.service';

@Component({
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    authorId: new FormControl('')
  });

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }
  
  onSubmit(data: any): void {
    let book = data.value as CreateBook;
    this.bookService.createBook(book).subscribe();
    window.location.href = '/books';
  }

}
