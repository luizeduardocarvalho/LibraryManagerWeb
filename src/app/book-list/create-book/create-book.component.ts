import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  createForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
  }
  
  onSubmit(data: any): void {
    // let teacher = data.value as Teacher;
    // this.teacherService.createTeacher(teacher).subscribe();
    // window.location.href = '/teacher-list';
  }

}
