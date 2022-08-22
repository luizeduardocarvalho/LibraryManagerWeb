import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';
import { TeacherService } from 'src/services/teacher.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss'],
})
export class CreateTeacherComponent implements OnInit {
  createForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  error: boolean = false;
  role: string = 'Teacher';

  constructor(
    private location: Location,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  selectTeacher(e: any) {
    this.role = e.target.value;
  }

  onSubmit(data: any): void {
    let teacher = data.value as CreateUser;
    teacher.role = this.role;
    this.authService.register(teacher).subscribe(
      (err: any) => console.log(err.errors),
      (res: any) => {
        if (res.status == 500 || res.status == 400) {
          this.error = true;
        }

        if (this.error) {
          this.redirect('Error', 'An error has occurred.', this.error);
        } else {
          this.redirect('Success!', `Teacher Created.`, this.error);
        }
      }
    );
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/teachers']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
