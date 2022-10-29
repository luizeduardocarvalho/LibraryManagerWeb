import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICard } from 'src/models/shared/card';
import { Teacher } from 'src/models/teacher';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

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
  closeResult = '';
  error: boolean = false;

  isLoading = false;

  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.createTeacherCards(teachers);
    });
  }

  open(content: any, id: any) {
    this.isLoading = true;

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result: string) => {
        if (result == 'Save click') {
          this.teacherService.delete(id).subscribe(
            (err: any) => (this.isLoading = false),
            (res: any) => {
              if (res.status == 500 || res.status == 400) {
                this.error = true;
                this.isLoading = false;
              }

              if (this.error) {
                this.toastService.show(
                  'Error',
                  'An error has occurred.',
                  this.error
                );
              } else {
                this.toastService.show(
                  'Success!',
                  'Teacher deleted.',
                  this.error
                );

                this.teacherService
                  .getAllTeachers()
                  .subscribe((teachers: Teacher[]) => {
                    this.createTeacherCards(teachers);
                    this.isLoading = false;
                  });
              }
            }
          );
        }
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
