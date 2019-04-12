import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';

import { AdalService } from './adal.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()

export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private adalService: AdalService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("Guarding "+route.url);
    let navigationExtras: NavigationExtras = {
      queryParams: { 'redirectUrl': route.url }
    };

    if (!this.adalService.userInfo) {
      this.router.navigate(['login'], navigationExtras);
    }
    
    return true;
  }

}
