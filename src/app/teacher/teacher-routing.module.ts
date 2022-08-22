import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/services/admin-guard.service';
import { AuthGuard } from 'src/services/auth-guard.service';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { TeacherListComponent } from './teacher-list.component';
import { TeacherReportComponent } from './teacher-report/teacher-report.component';
import { TeachersummaryComponent } from './teacher-summary/teacher-summary.component';
import { TeacherComponent } from './teacher/teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: TeacherListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'report',
        component: TeacherReportComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreateTeacherComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/summary',
        component: TeachersummaryComponent,
        pathMatch: 'full',
        canActivate: [AdminGuard],
      },
      {
        path: ':id/update',
        component: UpdateTeacherComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'summary',
        component: TeachersummaryComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
