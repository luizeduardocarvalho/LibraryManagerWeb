import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/models/teacher';
import { UpdateStudentTeacher } from 'src/models/update-student';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss'],
})
export class UpdateStudentComponent implements OnInit {
  studentId: number = 0;
  createForm = new FormGroup({
    studentId: new FormControl(this.studentId),
    studentName: new FormControl(),
  });
  student?: UpdateStudentTeacher;
  error: boolean = false;
  teachers: Teacher[] = [];
  selectedTeacher: number = 0;

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.studentId = params['id'];
    });

    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
      this.selectedTeacher = this.teachers[0].reference;
    });

    this.createForm = new FormGroup({
      studentId: new FormControl(this.studentId),
      studentName: new FormControl(),
    });
  }

  selectTeacher(e: any) {
    this.selectedTeacher = e.target.value;
  }

  onSubmit(data: any): void {
    let student = data.value as UpdateStudentTeacher;
    student.teacherId = this.selectedTeacher;
    this.studentService.updateStudentTeacher(student).subscribe(
      (err: any) => console.log(err.errors),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        } else {
          this.redirect('Success!', `Student Updated.`, this.error);
        }
      }
    );
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/students']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
