import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ModalSelectComponent } from 'src/app/shared/modal-select/modal-select.component';
import { Book } from 'src/models/book';
import { GetAuthor } from 'src/models/get-author';
import { UpdateBook } from 'src/models/update-book';
import { AuthorService } from 'src/services/author.service';
import { BookService } from 'src/services/book.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  createForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });
  bookId: number = 0;
  author: any = null;
  authors: GetAuthor[] = [];
  isLoadingAuthor = false;
  isLoading = false;
  modalRef: MDBModalRef | null = null;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location,
    private authorService: AuthorService,
    private modalService: MDBModalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
    });

    this.isLoading = true;
    this.bookService.getBookDetailsById(this.bookId).subscribe(
      (book: Book) => {
        this.isLoading = false;
        this.createForm.controls['title'].setValue(book.title);
        this.createForm.controls['description'].setValue(book.description);
        this.author = {
          authorId: book.authorId,
          name: book.authorName,
        } as GetAuthor;
      },
      (err: any) => (this.isLoading = false)
    );

    this.isLoadingAuthor = true;
    this.authorService.getSimpleAuthors().subscribe(
      (authors: GetAuthor[]) => {
        this.authors = authors;
        this.isLoadingAuthor = false;
      },
      (err: any) => (this.isLoadingAuthor = false)
    );
  }

  open() {
    let modalOptions = {
      data: {
        title: 'Select Author',
        buttonAction: 'Select',
        authors: this.authors,
      },
    };

    this.modalRef = this.modalService.show(ModalSelectComponent, modalOptions);

    this.modalRef.content.action.subscribe((author: GetAuthor) => {
      this.author = author;
    });
  }

  clearAuthor() {
    this.author = null;
  }

  onSubmit(data: any): void {
    this.isLoading = true;
    let book = data.value as UpdateBook;
    book.authorId = this.author.authorId;
    book.id = this.bookId;
    this.bookService.updateBook(book).subscribe(
      (res: any) => {
        this.router
          .navigate(['/books'], { queryParams: { title: book.title } })
          .then(() => {
            this.isLoading = false;
            this.toastrService.success(
              `Book ${book.title} has been updated.`,
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
}
