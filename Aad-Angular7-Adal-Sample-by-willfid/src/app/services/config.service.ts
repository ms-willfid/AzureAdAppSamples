import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() {
  }

  public get getAdalConfig(): any {

    return {
      tenant: 'williamfiddes.onmicrosoft.com',
      clientId: 'e0bdfdc9-8cb2-4a59-8533-d2f26a8f720e',
      redirectUri: window.location.origin + '/callback',
      postLogoutRedirectUri: window.location.origin + '/'
    };

  }

}