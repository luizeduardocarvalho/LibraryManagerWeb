import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/models/teacher';
import { User } from 'src/models/user';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  user?: any;
  teachers: Teacher[] = [];
  searchText: string = '';
  
  constructor(private teacherService: TeacherService) { }

  
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string);
    console.log(this.user);
    this.teacherService.getAllTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }

}
