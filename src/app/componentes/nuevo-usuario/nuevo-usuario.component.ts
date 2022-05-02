import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevoUsuario } from 'src/app/modelos/nuevo-usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form:FormGroup;

  constructor(private tokenService: TokenService, private authenticationService: AuthenticationService,
    private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group(
        {
          nombre:['',[Validators.required]],
          username:['',[Validators.required]],
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)]]
        }
      )
    }

  ngOnInit(): void {
  }

  onRegister(): void {
    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.username, this.email, this.password);
    this.authenticationService.registrar(this.nuevoUsuario).subscribe( data => {
      this.toastr.success('Usuario creado', 'OK', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.router.navigate(['/iniciar-sesion']);
    }, error => {
      this.messageError = error.error.message;
      this.toastr.error('Nombre de usuario o email duplicado, o contraseña incorrecta', 'Fail', {timeOut: 5000, positionClass: 'toast-top-center'});
    });
  }

  get Nombre(){
    return this.form.get('nombre');
  }

  get Username(){
    return this.form.get('username');
  }

  get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }
}