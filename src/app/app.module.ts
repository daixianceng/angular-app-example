import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  AuthGuard,
  LoginService,
  StyleService,
  UserService,
  AuthInterceptor,
  ErrorResponseInterceptor
} from './services';
import { AuthStore, UserStore } from './stores';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LOGIN_URL, TIME_RANGE_SEPARATOR } from 'app/common';
import { MainModule } from './layouts';
import { LoginModule, NotFoundModule } from './containers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MainModule,
    LoginModule,
    NotFoundModule
  ],
  providers: [
    AuthGuard,
    LoginService,
    StyleService,
    UserService,
    AuthStore,
    UserStore,
    {
      provide: LOGIN_URL,
      useValue: '/login'
    },
    {
      provide: TIME_RANGE_SEPARATOR,
      useValue: ' - '
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
