import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateStudent } from 'src/models/create-student';
import { StudentService } from 'src/services/student.service';
import { ToastService } from 'src/services/toast.service';

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

  error: boolean = false;

  constructor(
    private studentService: StudentService, 
    private location: Location,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let student = this.createForm.value as CreateStudent;
    this.studentService.createStudent(student).subscribe(
      (err: any) => console.log(err.errors),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          console.log(res.error.errors['Email']);
          this.redirect('Error', 'An error has occurred.', this.error);
        }
        else {
          this.redirect('Success!', `Student Created.`, this.error);
        }
      }
    );
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/students']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
