import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona.model';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  persona:Persona = { id: 0, fullname: '', name: '', surname: '', profilepicture: '', title:'', position:'', bannerpicture:'', aboutpersona:'', skills: [],
  educacion: [], experiencia_laboral: [], usuario: 0 };
  isShow = true;
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;

  constructor(private portfolioService:PortfolioService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      fullname: [''],
      name: [''],
      surname: [''],
      profilepicture: [''],
      title:[''],
      position: [''],
      bannerpicture: [''],
      aboutpersona: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerPersona();
    this.isAdmin = this.tokenService.isAdmin();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  obtenerPersona(){
    this.portfolioService.obtenerPersona().subscribe(persona =>{
      console.log(persona);
      this.persona=persona;
    }, error => {
      console.log(error)
    })
  }

  editarPersona() {
    const persona: Persona = {
      fullname: this.form.get('fullname')?.value,
      title: this.form.get('title')?.value,
      profilepicture: this.form.get('profilepicture')?.value,
      bannerpicture: this.form.get('bannerpicture')?.value,
      aboutpersona: this.form.get('aboutpersona')?.value,
      position: this.form.get('position')?.value,
      name: this.form.get('name')?.value,
      surname: this.form.get('surname')?.value,
    }

    persona.id = this.id;
    this.portfolioService.actualizarPersona(persona).subscribe(data => {
      this.obtenerPersona();
    }, error => {
      console.log(error);
    })
  }

  actualizarPersona(persona: any) {
    this.id = persona.id;
    this.form.patchValue({
      fullname: persona.fullname,
      name: persona.name,
      surname: persona.surname,
      profilepicture: persona.profilepicture,
      title: persona.title,
      position: persona.position,
      bannerpicture: persona.bannerpicture,
      aboutpersona: persona.aboutpersona
    })
  }

  cancelar(){
    this.form.reset();
        this.id = 1;
        this.obtenerPersona();
        this.isShow = !this.isShow
  }
}