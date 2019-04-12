import { NgModule } from '@angular/core';

import { LoginCallbackComponent } from '../login-callback/login-callback.component';
import { LoginCallbackHandler } from '../login-callback/login-callback.guard';

@NgModule({
  imports: [],
  declarations: [ LoginCallbackComponent],
  providers: [LoginCallbackHandler]
})

export class LoginCallbackModule { }
