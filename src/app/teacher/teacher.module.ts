import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CreateTeacherComponent } from './create-teacher/create-teacher.component';
import { TeacherListComponent } from './teacher-list.component';
import { TeacherReportComponent } from './teacher-report/teacher-report.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { TeachersummaryComponent } from './teacher-summary/teacher-summary.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';
import { TeacherComponent } from './teacher/teacher.component';

@NgModule({
  declarations: [
    TeacherComponent,
    CreateTeacherComponent,
    TeacherReportComponent,
    TeachersummaryComponent,
    UpdateTeacherComponent,
    TeacherListComponent,
    TeacherComponent,
  ],
  imports: [TeacherRoutingModule, SharedModule],
})
export class TeacherModule {}
