import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { GetAuthor } from 'src/models/get-author';
import { ICard } from 'src/models/shared/card';
import { AuthorService } from 'src/services/author.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnInit {
  authorCards: ICard[] = [];
  searchText: string = '';
  isLoading = false;
  modalRef: MDBModalRef | null = null;

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private modalService: MDBModalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchText = params['name'];
    });

    this.search(this.searchText);
  }

  open(event: any) {
    let modalOptions = {
      data: {
        title: 'Delete Author',
        buttonAction: 'Delete',
        id: event['id'],
        body: `Are you sure you want to delete ${event['name']}?`,
      },
    };

    this.modalRef = this.modalService.show(ModalComponent, modalOptions);

    this.modalRef.content.action.subscribe((id: any) => {
      this.isLoading = true;
      this.authorService.delete(id).subscribe(
        (res: any) => {
          this.search(this.searchText);

          this.toastrService.success(
            `${event['name']} has been deleted.`,
            'Success!'
          );
        },
        (err: any) => (this.isLoading = false)
      );
    });
  }

  search(searchText: any) {
    this.isLoading = true;
    this.authorService.getAuthorsByName(searchText).subscribe(
      (authors: GetAuthor[]) => {
        this.authorCards = authors.map((author) => ({
          id: author.authorId.toString(),
          name: author.name,
          bodyContent: [],
          buttons: [
            {
              actionUrl: `${author.authorId}`,
              icon: 'user',
              label: 'Info',
            },
            {
              actionUrl: `${author.authorId}/edit`,
              icon: 'edit',
              label: 'Edit',
            },
            {
              icon: 'trash',
              label: 'Delete',
              click: author.authorId.toString(),
            },
          ],
        }));

        this.isLoading = false;
      },
      (err: any) => (this.isLoading = false)
    );
  }
}
