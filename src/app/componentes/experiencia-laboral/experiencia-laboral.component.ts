import { Component, OnInit } from '@angular/core';
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
  constructor(private experiencialaboralService:ExperienciaLaboralService) { }

  ngOnInit(): void {
    this.obtenerExperienciaLaboral();
  }

  obtenerExperienciaLaboral(){
    this.experiencialaboralService.obtenerExperienciaLaboral().subscribe(data => {
      console.log(data);
      this.experiencialaboralLista=data;
    }, error => {
      console.log(error)
    })
  }

}