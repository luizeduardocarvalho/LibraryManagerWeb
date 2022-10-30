import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PipeModule } from 'src/pipes/pipe.module';
import { FooterComponent } from '../footer/footer.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavigationBarComponent,
    CardListComponent,
    CardComponent,
    SearchInputComponent,
    PageHeaderComponent,
    ModalComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    PipeModule,
  ],
  exports: [
    FooterComponent,
    CardComponent,
    NavigationBarComponent,
    SearchInputComponent,
    PageHeaderComponent,
    CardListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    PipeModule,
  ],
})
export class SharedModule {}
