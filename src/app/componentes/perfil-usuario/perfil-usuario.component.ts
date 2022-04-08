import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  username = '';
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.getToken(); {
      this.username = this.tokenService.getUsername();
    }
  }

}
