import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private router: Router, private localStorageToken: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageToken.getToken();

    if (token) {
      const tokenDecode = JSON.parse(window.atob(token.split('.')[1]));
      let isAdmin = false;
      for(let i = 0; i < tokenDecode.role_authorities.length; i++){
        if(tokenDecode.role_authorities[i].authority == "ADMIN"){
          isAdmin = true;
          break;
        }
      }
      if (isAdmin && !this._isTokenExpired(tokenDecode.exp)) return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  private _isTokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
