import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/modelos/login-usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  isLoggedIn = false;
  hasLoginFailed = false;
  loginUsuario!: LoginUsuario;
  //Sin signo de exclamación hay error.
  username!: string;
  //Sin signo de exclamación hay error.
  password!: string;
  //Sin signo de exclamación hay error.
  roles: string[] = [];
  messageError!: string;

  constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.hasLoginFailed = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authenticationService.login(this.loginUsuario).subscribe( data => {
      this.isLoggedIn = true;
      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.toastr.success('Sesión iniciada ' + data.username, 'OK', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.router.navigate(['/perfil-usuario'])
    }, error => {
      this.isLoggedIn = false;
      this.messageError = error.error.message;
      this.toastr.error('Nombre de usuario y/o contraseña incorrecto/s', 'Fail', {timeOut: 5000, positionClass: 'toast-top-center'});
      //console.log(error.error.message);
    });
  }
}