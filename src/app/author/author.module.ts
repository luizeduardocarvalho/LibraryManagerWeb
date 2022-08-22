import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorListComponent } from './author-list.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { AuthorComponent } from './author/author.component';
import { AuthorRoutingModule } from './author-routing.module';

@NgModule({
  declarations: [
    AuthorComponent,
    AuthorListComponent,
    CreateAuthorComponent,
    AuthorCardComponent,
  ],
  imports: [AuthorRoutingModule, SharedModule],
})
export class AuthorModule {}
