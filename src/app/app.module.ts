import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTeacherComponent } from './teacher-list/create-teacher/create-teacher.component';
import { TeacherCardComponent } from './teacher-list/teacher-card/teacher-card.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './book-list/create-book/create-book.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from 'src/services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookInfoComponent } from './book-list/book-info/book-info.component';
import { FilterPipe } from 'src/pipes/search.pipe';
import { LendBookComponent } from './book-list/lend-book/lend-book.component';
import { StudentListComponent } from './student-list/student-list.component';
import { CreateStudentComponent } from './student-list/create-student/create-student.component';
import { StudentCardComponent } from './student-list/student-card/student-card.component';
import { AuthorListComponent } from './author-list/author-list.component';
import { CreateAuthorComponent } from './author-list/create-author/create-author.component';
import { AuthorCardComponent } from './author-list/author-card/author-card.component';
import { UpdateBookComponent } from './book-list/update-book/update-book.component';
import { UpdateStudentComponent } from './student-list/update-student/update-student.component';
import { AdminGuard } from 'src/services/admin-guard.service';
import { TeacherReportComponent } from './teacher-list/teacher-report/teacher-report.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastComponent } from './toast/toast.component';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TeacherListComponent,
    NavigationBarComponent,
    FooterComponent,
    CreateTeacherComponent,
    TeacherCardComponent,
    BookListComponent,
    CreateBookComponent,
    LoginComponent,
    NotFoundComponent,
    BookInfoComponent,
    FilterPipe,
    LendBookComponent,
    StudentListComponent,
    CreateStudentComponent,
    StudentCardComponent,
    AuthorListComponent,
    CreateAuthorComponent,
    AuthorCardComponent,
    UpdateBookComponent,
    UpdateStudentComponent,
    TeacherReportComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      // Teacher
      {path: 'teachers', component: TeacherListComponent, canActivate: [AuthGuard]},
      {path: 'teachers/report', component: TeacherReportComponent, canActivate: [AuthGuard]},
      {path: 'teachers/create', component: CreateTeacherComponent, canActivate: [AuthGuard]},
      {path: 'teachers/:id', component: TeacherCardComponent, canActivate: [AdminGuard]},
      {path: 'teacher', component: TeacherCardComponent, canActivate: [AuthGuard]},

      // Book
      {path: 'books', component: BookListComponent, canActivate: [AuthGuard]},
      {path: 'books/create', component: CreateBookComponent, canActivate: [AuthGuard]},
      {path: 'books/:id', component: BookInfoComponent, canActivate: [AuthGuard]},
      {path: 'books/:id/update', component: UpdateBookComponent, canActivate: [AuthGuard]},
      {path: 'books/:id/lend', component: LendBookComponent, canActivate: [AuthGuard]},

      // Student
      {path: 'students', component: StudentListComponent, canActivate: [AuthGuard]},
      {path: 'students/create', component: CreateStudentComponent, canActivate: [AuthGuard]},
      {path: 'students/:id', component: StudentCardComponent, canActivate: [AuthGuard]},
      {path: 'students/:id/update', component: UpdateStudentComponent, canActivate: [AuthGuard]},

      // Author
      {path: 'authors', component: AuthorListComponent, canActivate: [AuthGuard]},
      {path: 'authors/create', component: CreateAuthorComponent, canActivate: [AuthGuard]},
      {path: 'authors/:id', component: AuthorCardComponent, canActivate: [AuthGuard]},

      // General
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'change-password', component: ChangePasswordComponent, canActivate:[AuthGuard]},
      {path: '*', component: TeacherCardComponent, canActivate:[AuthGuard]},
      {path: '**', component: TeacherCardComponent, canActivate:[AuthGuard]},

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
