import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/models/teacher';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  constructor(private teacherService: TeacherService) { }

  
  teachers: Teacher[] = [];
  headElements = ['ID', 'Name', 'Email', 'Actions']

  ngOnInit(): void {
    this.teacherService.getAllTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

}
