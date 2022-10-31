import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { ICard } from 'src/models/shared/card';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student.service';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  studentCards: ICard[] = [];
  searchText: string = '';
  isLoading = false;
  modalRef: MDBModalRef | null = null;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private modalService: MDBModalService
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
        title: 'Delete Teacher',
        buttonAction: 'Delete',
        id: event['id'],
        body: `Are you sure you want to delete ${event['name']}?`,
      },
    };

    this.modalRef = this.modalService.show(ModalComponent, modalOptions);

    this.modalRef.content.action.subscribe((id: any) => {
      this.isLoading = true;
      this.studentService.delete(id).subscribe(
        (res: any) => {
          this.toastrService.success(
            `${event['name']} has been deleted.`,
            'Success!'
          );
          this.search(this.searchText);
        },
        (err: any) => (this.isLoading = false)
      );
    });
  }

  search(searchText: any) {
    this.isLoading = true;
    this.studentService
      .getStudentsByName(searchText)
      .subscribe((students: Student[]) => {
        this.studentCards = students.map((student) => ({
          id: student.studentId.toString(),
          name: student.name,
          bodyContent: [],
          buttons: [
            {
              actionUrl: `${student.studentId}`,
              icon: 'user',
              label: 'Info',
            },
            {
              actionUrl: `${student.studentId}/update`,
              icon: 'edit',
              label: 'Edit',
            },
            {
              icon: 'trash',
              label: 'Delete',
              click: student.studentId.toString(),
            },
          ],
        }));

        this.isLoading = false;
      });
  }
}
