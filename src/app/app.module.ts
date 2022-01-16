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
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      {path: 'teachers', component: TeacherListComponent, canActivate: [AuthGuard]},
      {path: 'teachers/create', component: CreateTeacherComponent, canActivate: [AuthGuard]},
      {path: 'teachers/:id', component: TeacherCardComponent, canActivate: [AuthGuard]},
      {path: 'books', component: BookListComponent, canActivate: [AuthGuard]},
      {path: 'books/create', component: CreateBookComponent, canActivate: [AuthGuard]},
      {path: 'books/:id', component: BookInfoComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
