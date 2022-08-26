import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth-guard.service';
import { AuthorCardComponent } from './author-card/author-card.component';
import { AuthorListComponent } from './author-list.component';
import { AuthorComponent } from './author/author.component';
import { CreateAuthorComponent } from './create-author/create-author.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorComponent,
    children: [
      {
        path: '',
        component: AuthorListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        component: CreateAuthorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: AuthorCardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorRoutingModule {}
