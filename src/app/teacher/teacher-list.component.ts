import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { ICard } from 'src/models/shared/card';
import { Teacher } from 'src/models/teacher';
import { TeacherService } from 'src/services/teacher.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss'],
})
export class TeacherListComponent implements OnInit {
  user?: any;
  teachers: Teacher[] = [];
  teacherCards: ICard[] = [];
  searchText: string = '';

  modalRef: MDBModalRef | null = null;
  isLoading = false;

  constructor(
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private modalService: MDBModalService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.teacherService.getAllTeachers().subscribe(
      (teachers: Teacher[]) => {
        this.isLoading = false;
        this.createTeacherCards(teachers);
      },
      (err: any) => (this.isLoading = false)
    );
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
      this.teacherService.delete(id).subscribe(
        (res: any) => {
          this.teacherService
            .getAllTeachers()
            .subscribe((teachers: Teacher[]) => {
              this.createTeacherCards(teachers);
              this.isLoading = false;
            });

          this.toastrService.success(
            `${event['name']} has been deleted.`,
            'Success!'
          );
        },
        (err: any) => (this.isLoading = false)
      );
    });
  }

  createTeacherCards(teachers: Teacher[]) {
    this.teacherCards = teachers.map((teacher) => ({
      id: teacher.id.toString(),
      name: teacher.name,
      bodyContent: [teacher.role],
      buttons: [
        {
          actionUrl: `${teacher.id}`,
          icon: 'user',
          label: 'Info',
        },
        {
          actionUrl: `${teacher.id}/update`,
          icon: 'edit',
          label: 'Edit',
        },
        {
          icon: 'trash',
          label: 'Delete',
          click: teacher.id.toString(),
        },
      ],
    }));
  }
}
