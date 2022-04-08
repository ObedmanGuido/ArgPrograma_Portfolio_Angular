import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../modelos/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelos/login-usuario';
import { JwtDTO } from '../modelos/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationURL = 'http://localhost:8080/api/auth/'

  constructor(private httpClient: HttpClient) { }

  public registrar(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authenticationURL+'register', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authenticationURL+'login', loginUsuario);
  }
}
