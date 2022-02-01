import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangePassword } from 'src/models/change-password';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService: AuthService) { }

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl('')
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmNewPassword) {
      let localStorageUser = JSON.parse(localStorage.getItem('user') as string);
      let user = new ChangePassword(
        localStorageUser.email, 
        this.changePasswordForm.value.oldPassword, 
        this.changePasswordForm.value.newPassword);

      this.authService.changePassword(user).subscribe();
      window.location.href = '/';
    }
  }
}
