import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AboutComponent } from './about/about.component';
import { StartComponent } from './start/start.component';

import { AdalService } from './services/adal.service';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
//import { LoginCallbackComponent } from './login-callback/login-callback.component';
//import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { SharedServicesModule } from './services/shared-service.module';
import { LoginCallbackModule } from './login/login-callback.module';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    StartComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedServicesModule,
    LoginCallbackModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
