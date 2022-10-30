import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from 'src/models/teacher';
import { UpdateStudentTeacher } from 'src/models/update-student';
import { StudentService } from 'src/services/student.service';
import { TeacherService } from 'src/services/teacher.service';

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
    private toastrService: ToastrService
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

  // TODO: Add loader
  onSubmit(data: any): void {
    let student = data.value as UpdateStudentTeacher;
    student.teacherId = this.selectedTeacher;
    this.studentService.updateStudentTeacher(student).subscribe((res: any) => {
      this.router.navigate(['/students']).then(() => {
        this.toastrService.success('Student Updated.', 'Success!');
      });
    });
  }

  onBack() {
    this.location.back();
  }

  onClear() {
    this.createForm.reset();
  }
}
