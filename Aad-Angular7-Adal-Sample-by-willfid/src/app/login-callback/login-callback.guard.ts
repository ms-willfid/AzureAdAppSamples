import { Injectable } from '@angular/core';
 
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { AdalService } from '../services/adal.service';
 
@Injectable()
export class LoginCallbackHandler implements CanActivate {
 
  constructor(private router: Router, private adalService: AdalService) {
    console.log("Login-Callback-Handler called!");
  }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("CanActivate of Login-Callback-Handler called!");
    this.adalService.handleCallback();
    
    if (this.adalService.userInfo) {
    
        var returnUrl = route.queryParams['returnUrl'];
        
        if (!returnUrl) {
            this.router.navigate(['start']);
        } else {
            this.router.navigate([returnUrl], { queryParams: route.queryParams });
        }
    }
    
    else {
        this.router.navigate(['login']);
    }
    
    return false;
  }
 
}