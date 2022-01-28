import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    let user = {
      email: data.controls.email.value,
      password: data.controls.password.value,
      name: data.controls.name.value,
      role: 'Teacher'
    } as CreateUser;
    
    this.authService.register(user).subscribe();
    window.location.href = '/login';
  }
}
