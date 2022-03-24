import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExperienciaLaboralService } from 'src/app/servicios/experiencia-laboral.service';

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
  form: FormGroup;
  constructor(private experiencialaboralService:ExperienciaLaboralService, private fb:FormBuilder) {
    this.form = this.fb.group({
      company: [''],
      position:[''],
      logo: [''],
      startmonth: [''],
      startyear: [''],
      endmonth: [''],
      endyear: ['']
    })
  }

  ngOnInit(): void {
    this.obtenerExperienciaLaboral();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
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
      startmonth: this.form.get('startmonth')?.value,
      startyear: this.form.get('startyear')?.value,
      endmonth: this.form.get('endmonth')?.value,
      endyear: this.form.get('endyear')?.value,
    }
    this.experiencialaboralService.crearExperienciaLaboral(experiencialaboral).subscribe(data => {
      this.obtenerExperienciaLaboral();
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

}