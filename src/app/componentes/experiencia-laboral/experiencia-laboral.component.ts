import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExperienciaLaboral } from 'src/app/modelos/experiencia-laboral.model';
import { ExperienciaLaboralService } from 'src/app/servicios/experiencia-laboral.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia-laboral',
  templateUrl: './experiencia-laboral.component.html',
  styleUrls: ['./experiencia-laboral.component.css']
})
/*export class ExperienciaLaboralComponent implements OnInit {
  experiencialaboralList:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.experiencialaboralList=data.workexperience;
    })
  }

} Versión previa con JSON.*/

export class ExperienciaLaboralComponent implements OnInit {
  experiencialaboralLista?:ExperienciaLaboral[];
  experiencialaboral:ExperienciaLaboral = { id: 0, company: '', position: '', logo: '', startDate: new(Date), endDate: new(Date),
    workDescription: '', currentJob: false, persona:0 };
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;
  
  constructor(private experiencialaboralService:ExperienciaLaboralService, private fb:FormBuilder, private tokenService: TokenService, private toastr: ToastrService) {
    this.form = this.fb.group({
      company: ['',[Validators.required]],
      position:['',[Validators.required]],
      logo: [''],
      startDate: [0,[Validators.required]],
      endDate: [0,[Validators.required]],
      workDescription: ['',[Validators.required]],
      currentJob: false
    })
  }

  ngOnInit(): void {
    this.obtenerExperienciaLaboral();
    this.isAdmin = this.tokenService.isAdmin();
  }

  obtenerExperienciaLaboral(){
    this.experiencialaboralService.obtenerExperienciaLaboral().subscribe(experiencialaboral => {
      this.experiencialaboralLista=experiencialaboral;
    }, error => {
      console.log(error)
    })
  }

  crearExperienciaLaboral() {
    const experiencialaboral: ExperienciaLaboral = {
      company: this.form.get('company')?.value,
      position: this.form.get('position')?.value,
      logo: this.form.get('logo')?.value,
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value,
      workDescription: this.form.get('workDescription')?.value,
      currentJob: this.form.get('currentJob')?.value
    }

    if(this.id == undefined) {
      this.experiencialaboralService.crearExperienciaLaboral(experiencialaboral).subscribe(experiencialaboral => {
        this.obtenerExperienciaLaboral();
        this.toastr.success(experiencialaboral.position + ' en ' + experiencialaboral.company, 'Creada experiencia laboral', { timeOut: 5000, positionClass: 'toast-top-center' });
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      experiencialaboral.id = this.id;
      this.toastr.success(experiencialaboral.position + ' en ' + experiencialaboral.company, 'Editada experiencia laboral', { timeOut: 5000, positionClass: 'toast-top-center' });
      this.experiencialaboralService.actualizarExperienciaLaboral(this.id, experiencialaboral).subscribe(experiencialaboral => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerExperienciaLaboral();
      }, error => {
        console.log(error);
      })
    }
  }

  borrarExperienciaLaboral(id: number) {
    this.experiencialaboralService.borrarExperienciaLaboral(id).subscribe(experiencialaboral =>{
      this.toastr.error('Se eliminó una experiencia laboral', 'Borrada experiencia laboral', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.obtenerExperienciaLaboral();
    }, error => {
      console.log(error);
    })
  }

  actualizarExperienciaLaboral(experiencialaboral: ExperienciaLaboral) {
    this.accion = 'Editar experiencia laboral: ' + experiencialaboral.position + ' en ' + experiencialaboral.company;
    this.id = experiencialaboral.id;
    this.form.patchValue({
      company: experiencialaboral.company,
      position: experiencialaboral.position,
      logo: experiencialaboral.logo,
      startDate: experiencialaboral.startDate,
      endDate: experiencialaboral.endDate,
      workDescription: experiencialaboral.workDescription,
      currentJob: experiencialaboral.currentJob
    })
  }

  cancelar(){
    this.form.reset();
    this.toastr.error('Se canceló agregar/editar experiencia laboral', this.accion + ' cancelado', {timeOut: 5000, positionClass: 'toast-top-center'});
    this.accion = 'Agregar';
    this.id = undefined;
    this.obtenerExperienciaLaboral();
  }

  get Company(){
    return this.form.get('company');
  }

  get Position(){
    return this.form.get('position');
  }

  get StartDate(){
    return this.form.get('startDate');
  }

  get EndDate(){
    return this.form.get('endDate');
  }
  
  get WorkDescription(){
    return this.form.get('workDescription');
  }
}