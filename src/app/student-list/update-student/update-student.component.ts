import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateStudentTeacher } from 'src/models/update-student';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  studentId: number = 0;
  createForm = new FormGroup({
    studentId: new FormControl(this.studentId),
    teacherId: new FormControl()
  });
  student?: UpdateStudentTeacher;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.studentId = params['id']
    });

    this.createForm = new FormGroup({
      studentId: new FormControl(this.studentId),
      teacherId: new FormControl()
    });
  }

  onSubmit(data: any): void {
    let student = data.value as UpdateStudentTeacher;
    this.studentService.updateStudentTeacher(student).subscribe();
    window.location.href = `/students`;
  }

  onBack() {
    this.location.back();
  }
}