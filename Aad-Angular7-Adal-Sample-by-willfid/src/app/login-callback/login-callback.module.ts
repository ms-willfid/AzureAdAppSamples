import { NgModule } from '@angular/core';

import { LoginCallbackComponent } from './login-callback.component';
import { LoginCallbackHandler } from './login-callback.guard';

@NgModule({
  imports: [],
  declarations: [ LoginCallbackComponent],
  providers: [LoginCallbackHandler]
})

export class LoginCallbackModule { }
