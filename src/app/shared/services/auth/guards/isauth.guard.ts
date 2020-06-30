import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FireAuthService } from '../fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsauthGuard implements CanActivate {
  constructor(
    public auth: FireAuthService,
    public router: Router,
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if ( this.auth.isLoggedIn ){
        if ( JSON.parse(localStorage.getItem('userData')).status == 'worker'){
          this.router.navigate(['/events']);
        }else
        if (JSON.parse(localStorage.getItem('userData')).status == 'admin'){
          this.router.navigate(['/events']);
        }
      } 
    return true;
  }
  
}
