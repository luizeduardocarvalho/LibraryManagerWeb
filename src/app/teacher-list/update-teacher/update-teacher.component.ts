import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher';
import { UpdateTeacher } from 'src/models/teachers/update-teacher';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {

  teacherId: number = 0;
  teacher?: Teacher;
  error: boolean = false;
  role: string = 'Teacher';

  createForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  constructor(
    private teacherService: TeacherService, 
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teacherId = params['id']
    });

    this.teacherService.getById(this.teacherId).subscribe((teacher: Teacher) => {
      this.teacher = teacher;
      
      this.createForm = new FormGroup({
        name: new FormControl(this.teacher?.name),
        email: new FormControl(this.teacher?.email)
      });
    });
  }

  selectTeacher(e: any) {
    this.role = e.target.value;
  }

  onSubmit(): void {
    let teacher = this.createForm.value as UpdateTeacher;
    teacher.role = this.role;
    teacher.id = this.teacherId;

    this.teacherService.updateTeacher(teacher).subscribe((err: any) => console.log(err.errors),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        }
        else {
          this.redirect('Success!', `Teacher Updated.`, this.error);
        }
      }
    );
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/teachers']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
