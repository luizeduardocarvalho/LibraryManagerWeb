import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

  // TODO: Add loader
  onSubmit(data: any) {
    let user = {
      email: data.controls.email.value,
      password: data.controls.password.value,
      name: data.controls.name.value,
      role: 'Teacher',
    } as CreateUser;

    this.authService.register(user).subscribe(
      (res: any) => {
        this.router.navigate(['/login']).then(() => {
          this.toastrService.success('User registered.', 'Success!');
        });
      },
      (err: any) => (this.isLoading = false)
    );
  }

  onBack() {
    this.location.back();
  }
}
