import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ModalSelectComponent } from 'src/app/shared/modal-select/modal-select.component';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CreateBook } from 'src/models/create-book';
import { GetAuthor } from 'src/models/get-author';
import { AuthorService } from 'src/services/author.service';
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
  });

  author: any = null;
  authors: GetAuthor[] = [];
  isLoading = false;
  isLoadingAuthor = false;
  modalRef: MDBModalRef | null = null;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private location: Location,
    private modalService: MDBModalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    let book = data.value as CreateBook;
    book.authorId = this.author!.authorId.toString();
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
