import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateStudent } from 'src/models/create-student';
import { Teacher } from 'src/models/teacher';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl('')
  });

  
  teachers: Teacher[] = [];
  selectedTeacher: number = 0;
  error: boolean = false;

  constructor(
    private studentService: StudentService, 
    private location: Location,
    private toastService: ToastService,
    private router: Router,
    private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe((teachers: Teacher[]) => {
      this.teachers = teachers;
      this.selectedTeacher = this.teachers[0].id;
    });
  }

  selectTeacher(e: any) {
    this.selectedTeacher = e.target.value;
  }

  onSubmit(): void {
    let student = this.createForm.value as CreateStudent;
    student.teacherId = this.selectedTeacher;

    this.studentService.createStudent(student).subscribe(
      (err: any) => console.log(err.errors),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        }
        else {
          this.redirect('Success!', `Student Created.`, this.error);
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
