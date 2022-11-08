import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from 'src/interceptors/http-error.interceptor';
import { PipeModule } from 'src/pipes/pipe.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { ModalComponent } from './shared/modal/modal.component';
import { SharedModule } from './shared/shared.module';
import { MyAreaComponent } from './my-area/my-area.component';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    RegisterComponent,
    ChangePasswordComponent,
    MyAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    BrowserAnimationsModule,
    SharedModule,
    MDBBootstrapModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: [
          'localhost:5001',
          'librarymanager-api-staging.herokuapp.com',
          'librarymanager-api.herokuapp.com',
        ],
      },
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
