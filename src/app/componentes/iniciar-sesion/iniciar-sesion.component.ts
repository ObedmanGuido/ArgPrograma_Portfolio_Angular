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

  loginUsuario!: LoginUsuario;
  username!: string;
  password!: string;
  messageError!: string;

  constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.username, this.password);
    this.authenticationService.login(this.loginUsuario).subscribe( data => {
      this.tokenService.setToken(data.token);
      this.router.navigate(['/perfil-usuario'])
      this.toastr.success('Sesión iniciada ' + this.username, 'OK', {
        timeOut: 5000, positionClass: 'toast-top-center'
      });
    }, error => {
      this.messageError = error.error.message;
      this.toastr.error('Nombre de usuario y/o contraseña incorrecto/s', 'Fail', {timeOut: 5000, positionClass: 'toast-top-center'});
    });
  }
}