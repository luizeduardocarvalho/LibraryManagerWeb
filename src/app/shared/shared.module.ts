import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
