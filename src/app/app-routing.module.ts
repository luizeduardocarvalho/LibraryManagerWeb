import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/services/admin-guard.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateTeacherComponent } from './teacher-list/create-teacher/create-teacher.component';
import { TeachersummaryComponent } from './teacher-list/teacher-summary/teacher-summary.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherReportComponent } from './teacher-list/teacher-report/teacher-report.component';
import { UpdateTeacherComponent } from './teacher-list/update-teacher/update-teacher.component';

const routes: Routes = [
  {
    path: 'teachers',
    component: TeacherListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers/report',
    component: TeacherReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers/create',
    component: CreateTeacherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teachers/:id',
    component: TeachersummaryComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'teachers/:id/update',
    component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teacher',
    component: TeachersummaryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // {
  //   path: 'change-password',
  //   component: ChangePasswordComponent,
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'students',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
    canActivate: [AuthGuard],
  },
  { path: '*', component: TeachersummaryComponent, canActivate: [AuthGuard] },
  { path: '**', component: TeachersummaryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
