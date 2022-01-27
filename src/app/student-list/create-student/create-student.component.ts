import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateStudent } from 'src/models/create-student';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl(''),
    teacherId: new FormControl('')
  });

  constructor(private studentService: StudentService, private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let student = this.createForm.value as CreateStudent;
    this.studentService.createStudent(student).subscribe();
    window.location.href = '/students';
  }

  onBack() {
    this.location.back();
  }
}
