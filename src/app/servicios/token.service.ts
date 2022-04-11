import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(private router: Router) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
    //Sin signo de exclamación hay error.
  }

  public isLoggedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public getUsername(): string {
    if (!this.isLoggedIn()){
      return "No loggeado.";
    }
    const payload = this.getToken().split('.')[1];
    const payloadDecrypted = atob(payload);
    const payloadValues = JSON.parse(payloadDecrypted);
    const username = payloadValues.sub;
    return username
  }

  public isAdmin(): boolean {
    if (!this.isLoggedIn()){
      return false;
    }
    const payload = this.getToken().split('.')[1];
    const payloadDecrypted = atob(payload);
    const payloadValues = JSON.parse(payloadDecrypted);
    const roles = payloadValues.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['/portfolio']);
    window.location.reload();
  }
}
