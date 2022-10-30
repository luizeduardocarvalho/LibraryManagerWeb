import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';

@Component({
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss'],
})
export class CreateTeacherComponent implements OnInit {
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  isLoading = false;
  role: string = 'Teacher';

  constructor(
    private location: Location,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get name() {
    return this.createForm.get('name');
  }

  get email() {
    return this.createForm.get('email');
  }

  selectTeacher(e: any) {
    this.role = e.target.value;
  }

  onSubmit(data: any): void {
    this.isLoading = true;
    let teacher = data.value as CreateUser;
    teacher.role = this.role;
    this.authService.register(teacher).subscribe(
      (res: any) => {
        this.router.navigate(['/teachers']).then(() => {
          this.isLoading = false;
          this.toastrService.success('Teacher created.', 'Success!');
        });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onClear(): void {
    this.createForm.reset();
  }

  onBack() {
    this.location.back();
  }
}
