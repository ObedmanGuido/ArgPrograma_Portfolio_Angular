import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

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
  constructor(private portfolioService:PortfolioService) { }

  ngOnInit(): void {
    this.obtenerEducacion();
  }

  obtenerEducacion(){
    this.portfolioService.obtenerEducacion().subscribe(data => {
      console.log(data);
      this.educacionLista=data;
    }, error => {
      console.log(error)
    })
  }

}