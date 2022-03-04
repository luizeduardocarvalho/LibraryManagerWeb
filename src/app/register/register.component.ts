import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUser } from 'src/models/create-user';
import { AuthService } from 'src/services/auth.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  loginForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  error: boolean = false;

  constructor(
    private authService: AuthService, 
    private toastService: ToastService, 
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    let user = {
      email: data.controls.email.value,
      password: data.controls.password.value,
      name: data.controls.name.value,
      role: 'Teacher'
    } as CreateUser;
    
    this.authService.register(user).subscribe(
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
          this.redirect('Success!', `User registered.`, this.error);
        }
      }
    );
  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/login']).then(() => {
      this.toastService.show(text, header, error);
    });
  }

  onBack() {
    this.location.back();
  }
}
