import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateBook } from 'src/models/update-book';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });
  bookId: number = 0;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id']
    });
  }
  
  onSubmit(data: any): void {
    let book = data.value as UpdateBook;
    book.id = this.bookId;
    this.bookService.updateBook(book).subscribe();
    window.location.href = `/books?title=${book.title}`;
  }

}
