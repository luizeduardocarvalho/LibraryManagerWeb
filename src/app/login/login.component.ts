import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/models/user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
    console.log(process?.env?.['SECRET']);
  }

  onSubmit(data: any) {

    let user = {
      email: data.controls.email.value,
      password: data.controls.password.value
    } as User;
    
    this.authService.login(user).subscribe((data: User) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
    err => console.log("Error"),
    () => window.location.href = '/');
  }

}
