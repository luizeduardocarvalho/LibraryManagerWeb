import { Component, OnInit } from '@angular/core';
import { Student } from 'src/models/student';
import { StudentService } from 'src/services/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];
  searchText: string = '';

  constructor(private studentService: StudentService) { }

  ngOnInit(): void { }

  search(searchText: any) {
    this.studentService.getStudentsByName(searchText).subscribe((students: Student[]) => {
      this.students = students;
    });
  }

}
