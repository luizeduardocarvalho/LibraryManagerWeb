import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth-guard.service';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookListComponent } from './book-list.component';
import { BookComponent } from './book/book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { LendBookComponent } from './lend-book/lend-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      { path: '', component: BookListComponent, canActivate: [AuthGuard] },
      {
        path: 'create',
        component: CreateBookComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: BookInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/update',
        component: UpdateBookComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id/lend',
        component: LendBookComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
