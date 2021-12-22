import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Teacher } from 'src/models/teacher';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    let teacher = data.value as Teacher;
    this.teacherService.createTeacher(teacher).subscribe();
    window.location.href = '/teacher-list';
  }

}
