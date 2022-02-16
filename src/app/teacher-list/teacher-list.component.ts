import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Teacher } from 'src/models/teacher';
import { User } from 'src/models/user';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  user?: any;
  teachers: Teacher[] = [];
  searchText: string = '';
  closeResult = '';
  error: boolean = false;
  
  constructor(
    private teacherService: TeacherService,
    private modalService: NgbModal,
    private toastService: ToastService) { }

  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    this.teacherService.getAllTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

  open(content: any, id: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: string) => {
      if(result == 'Save click') {
        this.teacherService.delete(id).subscribe(
          (err: any) => console.log(err.errors),
          (res: any) => {
            if (res.status == 500 || res.status == 400) {
              this.error = true;
            }
    
            if (this.error) {
              this.toastService.show('Error', 'An error has occurred.', this.error);
            }
            else {
              this.toastService.show('Success!', 'Teacher deleted.', this.error);

              this.teacherService.getAllTeachers().subscribe((data: Teacher[]) => {
                this.teachers = data;
              });
            }
          }
        );
      }
    });
  }
}
