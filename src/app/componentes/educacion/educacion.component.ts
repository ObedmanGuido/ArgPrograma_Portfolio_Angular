import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  educacion:Educacion = { id: 0, schoolname: '', title: '', logo: '', startdate: new(Date), enddate: new(Date), typeofschool: '',
    studiesstatus: '', educationdescription: '', currenteducation: false, persona: 0 };
  isShow = true;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;

  constructor(private educacionService:EducacionService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      schoolname: ['',[Validators.required]],
      title:['',[Validators.required]],
      logo: [''],
      startdate: [0,[Validators.required]],
      enddate: [0,[Validators.required]],
      typeofschool: ['',[Validators.required]],
      studiesstatus: ['',[Validators.required]],
      educationdescription: ['',[Validators.required]],
      currenteducation: false
    })
  }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.isAdmin = this.tokenService.isAdmin();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  setDisplay() {
    this.isShow = false;
  }

  obtenerEducacion(){
    this.educacionService.obtenerEducacion().subscribe(educacion => {
      console.log(educacion);
      this.educacionLista=educacion;
    }, error => {
      console.log(error)
    })
  }

  crearEducacion() {
    const educacion: Educacion = {
      schoolname: this.form.get('schoolname')?.value,
      title: this.form.get('title')?.value,
      logo: this.form.get('logo')?.value,
      startdate: this.form.get('startdate')?.value,
      enddate: this.form.get('enddate')?.value,
      typeofschool: this.form.get('typeofschool')?.value,
      studiesstatus: this.form.get('studiesstatus')?.value,
      educationdescription: this.form.get('educationdescription')?.value,
      currenteducation: this.form.get('currenteducation')?.value
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
    this.accion = 'Editar educación: ' + educacion.title + ' en ' + educacion.schoolname;
    this.id = educacion.id;
    this.form.patchValue({
      schoolname: educacion.schoolname,
      title: educacion.title,
      logo: educacion.logo,
      startdate: educacion.startdate,
      enddate: educacion.enddate,
      typeofschool: educacion.typeofschool,
      studiesstatus: educacion.studiesstatus,
      educationdescription: educacion.educationdescription,
      currenteducation: educacion.currenteducation
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerEducacion();
  }

  get Schoolname(){
    return this.form.get('schoolname');
  }

  get Title(){
    return this.form.get('title');
  }

  get Startdate(){
    return this.form.get('startdate');
  }

  get Enddate(){
    return this.form.get('enddate');
  }

  get Typeofschool(){
    return this.form.get('typeofschool');
  }
  
  get Studiesstatus(){
    return this.form.get('studiesstatus');
  }
  
  get Educationdescription(){
    return this.form.get('educationdescription');
  }
}