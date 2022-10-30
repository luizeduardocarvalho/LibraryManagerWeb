import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ICard } from 'src/models/shared/card';
import { Teacher } from 'src/models/teacher';
import { TeacherService } from 'src/services/teacher.service';

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
    private toastrService: ToastrService
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
            (res: any) => {
              if (res.status == 500 || res.status == 400) {
                this.error = true;
                this.isLoading = false;
              }

              if (this.error) {
                this.toastrService.error('An error has occurred.', 'Error');
              } else {
                this.toastrService.success('Teacher deleted.', 'Success!');

                this.teacherService
                  .getAllTeachers()
                  .subscribe((teachers: Teacher[]) => {
                    this.createTeacherCards(teachers);
                    this.isLoading = false;
                  });
              }
            },
            (err: any) => (this.isLoading = false)
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
