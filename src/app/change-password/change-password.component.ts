import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/models/change-password';
import { AuthService } from 'src/services/auth.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl('')
  });
  
  error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmNewPassword) {
      let localStorageUser = JSON.parse(localStorage.getItem('user') as string);
      let user = new ChangePassword(
        localStorageUser.email,
        this.changePasswordForm.value.oldPassword,
        this.changePasswordForm.value.newPassword);

      this.authService.changePassword(user).subscribe((err: any) => console.log(err.errors),
        (res: any) => {
          if (res.status == 500 || res.status == 400) {
            this.error = true;
          }

          if (this.error) {
            console.log(res.error.errors['Email']);
            this.redirect('Error', 'An error has occurred.', this.error);
          }
          else {
            this.redirect('Success!', `Password Updated.`, this.error);
          }
        }
      );
    }

  }

  redirect(header: string, text: string, error: boolean) {
    this.router.navigate(['/']).then(() => {
      this.toastService.show(text, header, error);
    });
  }
}
