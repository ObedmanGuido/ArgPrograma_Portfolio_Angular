import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducacionEstado } from 'src/app/modelos/educacion-estado.model';
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
  educacion:Educacion = { id: 0, schoolName: '', title: '', logo: '', startDate: new(Date), endDate: new(Date), educationDescription: '', 
    currentEducation: false, educacion_tipo: {id: 0, educationType: ''}, educacion_estado:{id: 0, educationStatus: ''}, persona: 0 };
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;
  educacion_tipo:EducacionTipo = { id: 0, educationType: '' };
  educacion_tipoLista?:EducacionTipo[];
  educacion_estado:EducacionEstado = { id: 0, educationStatus: '' };
  educacion_estadoLista?:EducacionEstado[];

  constructor(private educacionService:EducacionService, private fb:FormBuilder, private tokenService: TokenService, private toastr: ToastrService) {
    this.form = this.fb.group({
      schoolName: ['',[Validators.required]],
      title:['',[Validators.required]],
      logo: [''],
      startDate: [0,[Validators.required]],
      endDate: [0,[Validators.required]],
      educationDescription: ['',[Validators.required]],
      currentEducation: false,
      educacion_tipo: ['',[Validators.required]],
      educacion_estado: ['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.obtenerEducacionTipo();
    this.obtenerEducacionEstado();
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

  obtenerEducacionEstado(){
    this.educacionService.obtenerEducacionEstado().subscribe(educacion_estado => {
      this.educacion_estadoLista=educacion_estado;
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
      educationDescription: this.form.get('educationDescription')?.value,
      currentEducation: this.form.get('currentEducation')?.value,
      educacion_tipo: this.educacion_tipoLista!.find(et=>et.id==this.form.get('educacion_tipo')?.value),
      educacion_estado: this.educacion_estadoLista!.find(es=>es.id==this.form.get('educacion_estado')?.value)
    }

    if(this.id == undefined) {
      this.educacionService.crearEducacion(educacion).subscribe(educacion => {
        this.obtenerEducacion();
        this.toastr.success(educacion.title + ' en ' + educacion.schoolName, 'Creada educación', { timeOut: 5000, positionClass: 'toast-top-center' });
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      educacion.id = this.id;
      this.toastr.success(educacion.title + ' en ' + educacion.schoolName, 'Editada educación', { timeOut: 5000, positionClass: 'toast-top-center' });
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
      this.toastr.error('Se eliminó una educación', 'Borrada educación', {timeOut: 5000, positionClass: 'toast-top-center'});
      this.obtenerEducacion();
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
      educationDescription: educacion.educationDescription,
      currentEducation: educacion.currentEducation,
      educacion_tipo: educacion.educacion_tipo?.id,
      educacion_estado: educacion.educacion_estado?.id
    })
  }

  cancelar(){
    this.form.reset();
    this.toastr.error('Se canceló agregar/editar educación', this.accion + ' cancelado', {timeOut: 5000, positionClass: 'toast-top-center'});
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
  
  get EducationDescription(){
    return this.form.get('educationDescription');
  }

  get Educacion_tipo(){
    return this.form.get('educacion_tipo')
  }

  get Educacion_estado(){
    return this.form.get('educacion_estado');
  }
}