import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateStudent } from 'src/models/create-student';
import { Teacher } from 'src/models/teacher';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss'],
})
export class CreateStudentComponent implements OnInit {
  createForm = new FormGroup({
    name: new FormControl(''),
  });

  isLoading = false;
  teachers: Teacher[] = [];
  selectedTeacher: number = 0;
  error: boolean = false;

  constructor(
    private studentService: StudentService,
    private location: Location,
    private toastrService: ToastrService,
    private router: Router,
    private teacherService: TeacherService
  ) {}

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
    this.isLoading = true;
    let student = this.createForm.value as CreateStudent;
    student.teacherId = this.selectedTeacher;

    this.studentService.createStudent(student).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.router.navigate(['/students']).then(() => {
          this.toastrService.success('Student Created.', 'Success!');
        });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }

  onClear() {
    this.createForm.reset();
  }
}
