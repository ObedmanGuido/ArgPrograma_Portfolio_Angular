import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  experiencialaboralLista:any[] = [{}];
  isShow = true;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;
  
  constructor(private experiencialaboralService:ExperienciaLaboralService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      company: [''],
      position:[''],
      logo: [''],
      startdate: 0,
      enddate: 0,
      workdescription: [''],
      currentjob: false
    })
  }

  ngOnInit(): void {
    this.obtenerExperienciaLaboral();
    this.isAdmin = this.tokenService.isAdmin();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  setDisplay() {
    this.isShow = false;
  }

  obtenerExperienciaLaboral(){
    this.experiencialaboralService.obtenerExperienciaLaboral().subscribe(data => {
      console.log(data);
      this.experiencialaboralLista=data;
    }, error => {
      console.log(error)
    })
  }

  crearExperienciaLaboral() {
    const experiencialaboral: any = {
      company: this.form.get('company')?.value,
      position: this.form.get('position')?.value,
      logo: this.form.get('logo')?.value,
      startdate: this.form.get('startdate')?.value,
      enddate: this.form.get('enddate')?.value,
      workdescription: this.form.get('workdescription')?.value,
      currentjob: this.form.get('currentjob')?.value
    }

    if(this.id == undefined) {
      this.experiencialaboralService.crearExperienciaLaboral(experiencialaboral).subscribe(data => {
        this.obtenerExperienciaLaboral();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      experiencialaboral.id = this.id;
      this.experiencialaboralService.actualizarExperienciaLaboral(this.id, experiencialaboral).subscribe(data => {
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
    this.experiencialaboralService.borrarExperienciaLaboral(id).subscribe(data =>{
      this.obtenerExperienciaLaboral()
    }, error => {
      console.log(error);
    })
  }

  actualizarExperienciaLaboral(experiencialaboral: any) {
    this.accion = 'Editar experiencia laboral: ' + experiencialaboral.position + ' en ' + experiencialaboral.company;
    this.id = experiencialaboral.id;
    this.form.patchValue({
      company: experiencialaboral.company,
      position: experiencialaboral.position,
      logo: experiencialaboral.logo,
      startdate: experiencialaboral.startdate,
      enddate: experiencialaboral.enddate,
      workdescription: experiencialaboral.workdescription,
      currentjob: experiencialaboral.currentjob
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerExperienciaLaboral();
  }
}