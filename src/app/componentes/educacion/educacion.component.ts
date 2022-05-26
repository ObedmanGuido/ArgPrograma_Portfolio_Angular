import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EducacionTipo } from 'src/app/modelos/educacion-tipo.model';
import { Educacion } from 'src/app/modelos/educacion.model';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
/*export class EducacionComponent implements OnInit {
  educacionList:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      this.educacionList=data.education;
    })
  }

} Versión previa con JSON.*/

export class EducacionComponent implements OnInit {
  educacionLista?:Educacion[];
  educacion:Educacion = { id: 0, schoolName: '', title: '', logo: '', startDate: new(Date), endDate: new(Date),
    studiesStatus: '', educationDescription: '', currentEducation: false, educacion_tipo: {id: 0, educationType: ''}, persona: 0 };
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;
  educacion_tipo:EducacionTipo = { id: 0, educationType: '' };
  educacion_tipoLista?:EducacionTipo[];

  constructor(private educacionService:EducacionService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      schoolName: ['',[Validators.required]],
      title:['',[Validators.required]],
      logo: [''],
      startDate: [0,[Validators.required]],
      endDate: [0,[Validators.required]],
      studiesStatus: ['',[Validators.required]],
      educationDescription: ['',[Validators.required]],
      currentEducation: false,
      educacion_tipo: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.obtenerEducacionTipo();
    this.isAdmin = this.tokenService.isAdmin();
  }

  obtenerEducacion(){
    this.educacionService.obtenerEducacion().subscribe(educacion => {
      this.educacionLista=educacion;
    }, error => {
      console.log(error)
    })
  }

  obtenerEducacionTipo(){
    this.educacionService.obtenerEducacionTipo().subscribe(educacion_tipo => {
      this.educacion_tipoLista=educacion_tipo;
    }, error => {
      console.log(error)
    });
  }

  crearEducacion() {
    const educacion: Educacion = {
      schoolName: this.form.get('schoolName')?.value,
      title: this.form.get('title')?.value,
      logo: this.form.get('logo')?.value,
      startDate: this.form.get('startDate')?.value,
      endDate: this.form.get('endDate')?.value,
      studiesStatus: this.form.get('studiesStatus')?.value,
      educationDescription: this.form.get('educationDescription')?.value,
      currentEducation: this.form.get('currentEducation')?.value,
      educacion_tipo: this.educacion_tipoLista!.find(et=>et.id==this.form.get('educacion_tipo')?.value)
    }

    if(this.id == undefined) {
      this.educacionService.crearEducacion(educacion).subscribe(educacion => {
        this.obtenerEducacion();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      educacion.id = this.id;
      this.educacionService.actualizarEducacion(this.id, educacion).subscribe(educacion => {
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerEducacion();
      }, error => {
        console.log(error);
      })
    }
  }

  borrarEducacion(id: number) {
    this.educacionService.borrarEducacion(id).subscribe(educacion =>{
      this.obtenerEducacion()
    }, error => {
      console.log(error);
    })
  }

  actualizarEducacion(educacion: Educacion) {
    this.accion = 'Editar educación: ' + educacion.title + ' en ' + educacion.schoolName;
    this.id = educacion.id;
    this.form.patchValue({
      schoolName: educacion.schoolName,
      title: educacion.title,
      logo: educacion.logo,
      startDate: educacion.startDate,
      endDate: educacion.endDate,
      studiesStatus: educacion.studiesStatus,
      educationDescription: educacion.educationDescription,
      currentEducation: educacion.currentEducation,
      educacion_tipo: educacion.educacion_tipo?.id
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerEducacion();
  }

  get SchoolName(){
    return this.form.get('schoolName');
  }

  get Title(){
    return this.form.get('title');
  }

  get StartDate(){
    return this.form.get('startDate');
  }

  get EndDate(){
    return this.form.get('endDate');
  }
  
  get StudiesStatus(){
    return this.form.get('studiesStatus');
  }
  
  get EducationDescription(){
    return this.form.get('educationDescription');
  }

  get Educacion_tipo(){
    return this.form.get('educacion_tipo')
  }
}