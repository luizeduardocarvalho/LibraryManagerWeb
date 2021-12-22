import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { CreateTeacherComponent } from './teacher-list/create-teacher/create-teacher.component';
import { TeacherCardComponent } from './teacher-list/teacher-card/teacher-card.component';
import { BookListComponent } from './book-list/book-list.component';
import { CreateBookComponent } from './book-list/create-book/create-book.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
      {path: 'teachers', component: TeacherListComponent},
      {path: 'teachers/create', component: CreateTeacherComponent},
      {path: 'teachers/:id', component: TeacherCardComponent},
      {path: 'books', component: BookListComponent},
      {path: 'books/create', component: CreateBookComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
