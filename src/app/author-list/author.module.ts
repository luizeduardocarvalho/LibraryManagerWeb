import { NgModule } from '@angular/core';
import { AuthorListComponent } from './author-list.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { AuthorCardComponent } from './author-card/author-card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth-guard.service';



@NgModule({
  declarations: [
    AuthorListComponent,
    CreateAuthorComponent,
    AuthorCardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'authors', component: AuthorListComponent, canActivate: [AuthGuard]},
      {path: 'authors/create', component: CreateAuthorComponent, canActivate: [AuthGuard]},
      {path: 'authors/:id', component: AuthorCardComponent, canActivate: [AuthGuard]},
    ])
  ],
  exports: [
    AuthorListComponent,
    CreateAuthorComponent,
    AuthorCardComponent
  ]
})
export class AuthorModule { }
