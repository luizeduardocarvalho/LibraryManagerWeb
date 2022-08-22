import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BookInfoComponent } from './book-info/book-info.component';
import { BookListComponent } from './book-list.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { LendBookComponent } from './lend-book/lend-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { BookComponent } from './book/book.component';
import { BookRoutingModule } from './book-routing.module';

@NgModule({
  declarations: [
    BookListComponent,
    CreateBookComponent,
    UpdateBookComponent,
    BookInfoComponent,
    LendBookComponent,
    BookComponent,
  ],
  imports: [BookRoutingModule, SharedModule],
})
export class BookModule {}
