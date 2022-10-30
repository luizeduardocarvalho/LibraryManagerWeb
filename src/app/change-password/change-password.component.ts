import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangePassword } from 'src/models/change-password';
import { AuthService } from 'src/services/auth.service';

@Component({
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  });

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading = true;
    if (
      this.changePasswordForm.value.newPassword ==
      this.changePasswordForm.value.confirmNewPassword
    ) {
      let localStorageUser = JSON.parse(localStorage.getItem('user') as string);
      let user = new ChangePassword(
        localStorageUser.email,
        this.changePasswordForm.value.oldPassword,
        this.changePasswordForm.value.newPassword
      );

      this.authService.changePassword(user).subscribe(
        (res: any) => {
          this.isLoading = false;
          this.router.navigate(['/']).then(() => {
            this.toastrService.show('Password Updated.', 'Success!');
          });
        },
        (err: any) => (this.isLoading = false)
      );
    }
  }
}
