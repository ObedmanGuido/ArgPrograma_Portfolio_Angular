import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/modelos/nuevo-usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {

  nuevoUsuario!: NuevoUsuario;
  nombre!: string;
  username!: string;
  email!: string;
  password!: string;
  messageError!: string;
  isLoggedIn = false;

  constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.username, this.email, this.password);
    this.authenticationService.registrar(this.nuevoUsuario).subscribe( data => {
      this.toastr.success('Usuario creado', 'OK', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.router.navigate(['/iniciar-sesion']);
    }, error => {
      this.messageError = error.error.message;
      this.toastr.error('Nombre de usuario o email duplicado, o contraseña incorrecta', 'Fail', {timeOut: 5000, positionClass: 'toast-top-center'});
      //console.log(error.error.message);
    });
  }
}
