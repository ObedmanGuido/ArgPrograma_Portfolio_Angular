import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducacionService } from 'src/app/servicios/educacion.service';

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
  educacionLista:any[] = [{}];
  isShow = true;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  constructor(private educacionService:EducacionService, private fb:FormBuilder) {
    this.form = this.fb.group({
      schoolname: [''],
      title:[''],
      logo: [''],
      startyear: [''],
      endyear: [''],
      typeofschool: [''],
      status: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerEducacion();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  setDisplay() {
    this.isShow = false;
  }

  obtenerEducacion(){
    this.educacionService.obtenerEducacion().subscribe(data => {
      console.log(data);
      this.educacionLista=data;
    }, error => {
      console.log(error)
    })
  }

  crearEducacion() {
    const educacion: any = {
      schoolname: this.form.get('schoolname')?.value,
      title: this.form.get('title')?.value,
      logo: this.form.get('logo')?.value,
      startyear: this.form.get('startyear')?.value,
      endyear: this.form.get('endyear')?.value,
      typeofschool: this.form.get('typeofschool')?.value,
      status: this.form.get('status')?.value,
    }

    if(this.id == undefined) {
      this.educacionService.crearEducacion(educacion).subscribe(data => {
        this.obtenerEducacion();
        this.form.reset();
      }, error => {
        console.log(error);
      })
    } else {
      educacion.id = this.id;
      this.educacionService.actualizarEducacion(this.id, educacion).subscribe(data => {
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
    this.educacionService.borrarEducacion(id).subscribe(data =>{
      this.obtenerEducacion()
    }, error => {
      console.log(error);
    })
  }

  actualizarEducacion(educacion: any) {
    this.accion = 'Editar educación: ' + educacion.title + ' en ' + educacion.schoolname;
    this.id = educacion.id;
    this.form.patchValue({
      schoolname: educacion.schoolname,
      title: educacion.title,
      logo: educacion.logo,
      startyear: educacion.startyear,
      endyear: educacion.endyear,
      typeofschool: educacion.typeofschool,
      status: educacion.status
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerEducacion();
  }
}