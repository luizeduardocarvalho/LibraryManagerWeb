import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipeModule } from 'src/pipes/pipe.module';
import { AuthGuard } from 'src/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookListComponent } from './book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { LendBookComponent } from './lend-book/lend-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';


@NgModule({
  declarations: [
    BookListComponent,
    CreateBookComponent,
    UpdateBookComponent,
    BookInfoComponent,
    LendBookComponent
  ],
  imports: [
    SharedModule,
    NgbModule,
    PipeModule,
    RouterModule.forRoot([
      {path: 'books', component: BookListComponent, canActivate: [AuthGuard]},
      {path: 'books/create', component: CreateBookComponent, canActivate: [AuthGuard]},
      {path: 'books/:id', component: BookInfoComponent, canActivate: [AuthGuard]},
      {path: 'books/:id/update', component: UpdateBookComponent, canActivate: [AuthGuard]},
      {path: 'books/:id/lend', component: LendBookComponent, canActivate: [AuthGuard]},
    ])
  ],
  exports: [
    BookListComponent,
    CreateBookComponent,
    UpdateBookComponent,
    BookInfoComponent,
    LendBookComponent
  ]
})
export class BookModule { }
