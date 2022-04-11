import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  educacionLista:any[] = [{}];
  isShow = true;
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;
  authority!:string;
  isAdmin = false;

  constructor(private educacionService:EducacionService, private fb:FormBuilder, private tokenService: TokenService) {
    this.form = this.fb.group({
      schoolname: [''],
      title:[''],
      logo: [''],
      startyear: 0,
      endyear: 0,
      typeofschool: [''],
      studiesstatus: ['']
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
      studiesstatus: this.form.get('studiesstatus')?.value,
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
      studiesstatus: educacion.studiesstatus
    })
  }

  cancelar(){
    this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.obtenerEducacion();
  }
}