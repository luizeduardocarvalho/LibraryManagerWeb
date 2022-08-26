import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { TeachersummaryComponent } from './teacher/teacher-summary/teacher-summary.component';

const routes: Routes = [
  {
    path: 'authors',
    loadChildren: () =>
      import('./author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teacher/teacher.module').then((m) => m.TeacherModule),
  },
  {
    path: 'books',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule),
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  // {
  //   path: 'register',
  //   loadChildren: () =>
  //     import('./register/register.module').then((m) => m.RegisterModule),
  // },
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
