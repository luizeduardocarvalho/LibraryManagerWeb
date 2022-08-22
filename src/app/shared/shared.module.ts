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
import { ToastComponent } from '../toast/toast.component';

@NgModule({
  declarations: [FooterComponent, NavigationBarComponent, ToastComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  exports: [
    ToastComponent,
    FooterComponent,
    NavigationBarComponent,
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
