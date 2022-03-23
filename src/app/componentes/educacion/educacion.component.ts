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

} Version previa con JSON.*/

export class EducacionComponent implements OnInit {
  educacionLista:any[] = [{}];
  isShow = true;
  form: FormGroup;
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
    this.educacionService.crearEducacion(educacion).subscribe(data => {
      this.obtenerEducacion();
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

}