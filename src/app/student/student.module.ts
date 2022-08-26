import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student/student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

@NgModule({
  declarations: [
    StudentComponent,
    StudentListComponent,
    CreateStudentComponent,
    StudentCardComponent,
    UpdateStudentComponent,
  ],
  imports: [StudentRoutingModule, SharedModule],
})
export class StudentModule {}
