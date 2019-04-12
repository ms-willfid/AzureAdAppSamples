/// <reference path="../../../node_modules/@types/adal/index.d.ts" />

import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';

import 'expose-loader?AuthenticationContext!../../../node_modules/adal-angular/lib/adal.js';

let createAuthContextFn: adal.AuthenticationContextStatic = AuthenticationContext;

@Injectable()

export class AdalService {

  private context: adal.AuthenticationContext;

  constructor(private configService: ConfigService) {
    this.context = new createAuthContextFn(configService.getAdalConfig);
  }


  login() {
    this.context.login();
  }

  logout() {
    console.log("LOGGING AdalService Logout called!");
    this.context.logOut();
  }

  handleCallback() {
    this.context.handleWindowCallback();
  }

  acquireToken(resource, callback) {
    return this.context.acquireToken(resource,callback);
  }

  public getCachedToken(resource?) {
    if(resource) {
      return this.context.getCachedToken(resource);
    }
    return this.context.getCachedToken(this.configService.getAdalConfig.clientId);
  }

  public get userInfo() {
    return this.context.getCachedUser();
  }

  public get getCachedUser() {
    return this.context.getCachedUser();
  }

  public get isAuthenticated() {
    return this.userInfo && this.getCachedToken();
  }

  // popUp GET & SET
  public set popUp(value:boolean) {
    this.popUp = value;
  }

  public get popUp():boolean {
    return this.popUp;
  }
}
