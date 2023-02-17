import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteService } from './route.service';
import { TokenStoreService } from './token-store.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private token : TokenStoreService, private route : RouteService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.token.getUser().role == 'admin'){
        return true
      }else if(this.token.getUser().role == 'user'){
        this.route.toDashboard();
        return false 

      }else {
        this.route.toLogin();
        return false 
      }
  }
  
}
