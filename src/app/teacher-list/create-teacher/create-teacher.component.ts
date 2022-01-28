import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';
import { TeacherService } from 'src/services/teacher.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {

  createForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl('')
  });

  constructor(
    private teacherService: TeacherService, 
    private location: Location,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(data: any): void {
    let teacher = data.value as CreateUser;
    teacher.password = '123456';
    this.authService.register(teacher).subscribe();
    window.location.href = '/teachers';
  }

  onBack() {
    this.location.back();
  }
}
