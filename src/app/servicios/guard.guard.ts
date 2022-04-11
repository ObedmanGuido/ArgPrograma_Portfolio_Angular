import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  rolDelUsuario!: string;

  constructor(private tokenService: TokenService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const rolesEsperados = route.data['rolesEsperados'];
    this.rolDelUsuario = this.tokenService.isAdmin() ? 'admin' : 'user';
    if (!this.tokenService.isLoggedIn() || rolesEsperados.indexOf(this.rolDelUsuario) === -1) {
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }
    return true;
  }
}