import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorListComponent } from './author-list.component';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorComponent } from './author/author.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { EditAuthorComponent } from './edit-author/edit-author.component';

@NgModule({
  declarations: [
    AuthorComponent,
    AuthorListComponent,
    CreateAuthorComponent,
    AuthorCardComponent,
    EditAuthorComponent,
  ],
  imports: [AuthorRoutingModule, SharedModule],
})
export class AuthorModule {}
