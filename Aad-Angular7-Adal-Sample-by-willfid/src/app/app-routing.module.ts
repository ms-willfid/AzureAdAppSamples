import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { StartComponent } from './start/start.component';
import { AboutComponent } from './about/about.component';

import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { LoginCallbackHandler } from './login-callback/login-callback.guard';
import { AuthenticationGuard } from './services/authentication.guard';



const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'start', component: StartComponent, canActivate: [AuthenticationGuard] },
  { path: 'about', component: AboutComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'callback', component: LoginCallbackComponent, canActivate: [LoginCallbackHandler] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
