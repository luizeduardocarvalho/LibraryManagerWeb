import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TeacherWithStudents } from 'src/models/teacher-students';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-teacher-report',
  templateUrl: './teacher-report.component.html',
  styleUrls: ['./teacher-report.component.scss']
})
export class TeacherReportComponent implements OnInit {

  teacherList?: TeacherWithStudents[];

  constructor(private location: Location, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.teacherService.getTeacherReport().subscribe((teacherList: TeacherWithStudents[]) => {
      this.teacherList = teacherList.filter(tl => tl.students.length != 0);
    });
  }

  onBack() {
    this.location.back();
  }
}
