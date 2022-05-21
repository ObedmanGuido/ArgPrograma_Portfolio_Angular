import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelos/persona.model';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';
import { Provincia } from 'src/app/modelos/provincia.model';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  persona:Persona = { id: 0, name: '', surname: '', profilePicture: '', title:'', position:'', bannerPicture:'', aboutPersona:'',
    dateOfBirth: new(Date), telephone: '', email: '', skills: [], educacion: [], experiencia_laboral: [], proyecto: [], usuario: 0, provincia: {id: 0, provinceName: ''} };
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;
  provincia:Provincia = { id: 0, provinceName: '' };
  provinciaLista?:Provincia[];

  constructor(private portfolioService:PortfolioService, private fb:FormBuilder, private tokenService: TokenService, private toastr: ToastrService) {
    this.form = this.fb.group({
      name: ['',[Validators.required]],
      surname: ['',[Validators.required]],
      profilePicture: [''],
      title:['',[Validators.required]],
      position: ['',[Validators.required]],
      bannerPicture: [''],
      aboutPersona: ['',[Validators.required]],
      address: ['',[Validators.required]],
      dateOfBirth: [0,[Validators.required]],
      telephone: ['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      provincia:['']
    })
  }

  ngOnInit(): void {
    this.obtenerPersona();
    this.obtenerProvincias();
    this.isAdmin = this.tokenService.isAdmin();
  }

  obtenerPersona(){
    this.portfolioService.obtenerPersona().subscribe(persona =>{
      this.persona=persona;
    }, error => {
      console.log(error);
      this.toastr.error('El server no se inicializó a tiempo o tuvo un error, refresque la página.', 'Fail', {timeOut: 1800000, positionClass: 'toast-top-center'});
    })
  }

  obtenerProvincias(){
    this.portfolioService.obtenerProvincias().subscribe(provincia =>{
      this.provinciaLista=provincia;
    }, error =>{
      console.log(error)
    });
  }

  editarPersona() {
    const persona: Persona = {
      title: this.form.get('title')?.value,
      profilePicture: this.form.get('profilePicture')?.value,
      bannerPicture: this.form.get('bannerPicture')?.value,
      aboutPersona: this.form.get('aboutPersona')?.value,
      position: this.form.get('position')?.value,
      name: this.form.get('name')?.value,
      surname: this.form.get('surname')?.value,
      dateOfBirth: this.form.get('dateOfBirth')?.value,
      telephone: this.form.get('telephone')?.value,
      email: this.form.get('email')?.value,
      provincia: this.provinciaLista!.find(p=>p.id==this.form.get('provincia')?.value) //Mandar el objeto de provincia al backend
    }
    persona.id = this.id;
    this.portfolioService.actualizarPersona(persona).subscribe(data => {
      this.obtenerPersona();
    }, error => {
      console.log(error);
    })
  }

  actualizarPersona(persona: Persona) {
    this.id = persona.id;
    this.form.patchValue({
      name: persona.name,
      surname: persona.surname,
      profilePicture: persona.profilePicture,
      title: persona.title,
      position: persona.position,
      bannerPicture: persona.bannerPicture,
      aboutPersona: persona.aboutPersona,
      dateOfBirth: persona.dateOfBirth,
      telephone: persona.telephone,
      email: persona.email,
      provincia: persona.provincia?.id
    })
  }

  cancelar(){
    this.form.reset();
        this.id = 1;
        this.obtenerPersona();
  }

  get Name(){
    return this.form.get('name');
  }

  get Surname(){
    return this.form.get('surname');
  }

  get Title(){
    return this.form.get('title');
  }

  get Position(){
    return this.form.get('position');
  }

  get AboutPersona(){
    return this.form.get('aboutPersona');
  }
  
  get DateOfBirth(){
    return this.form.get('dateOfBirth');
  }
  
  get Telephone(){
    return this.form.get('telephone');
  }
  
  get Email(){
    return this.form.get('email');
  }

  get Provincia(){
    return this.form.get('provincia')
  }
}