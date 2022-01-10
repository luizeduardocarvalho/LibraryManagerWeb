import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student.service';

@Component({
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})
export class TeacherCardComponent implements OnInit {
  students: Student[] = [];
  teacherId: number = 0;

  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teacherId = params['id']
    });

    this.studentService.getStudentsByTeacherWithBookCount(this.teacherId).subscribe((students: Student[]) => {
      this.students = students;
    });
  }
}
