import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router) { }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(data: any) {
    this.isLoading = true;

    let user = {
      email: data.controls.email.value,
      password: data.controls.password.value
    } as User;

    this.authService.login(user).subscribe(
      (data: User) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (err: any) => {
        console.log(err);
        this.isLoading = false;
        this.toastService.show(err.error, 'Error', true);
      }
    );
  }
}
