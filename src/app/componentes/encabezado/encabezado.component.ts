import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { PersonaService } from 'src/app/servicios/para-clases-y-componentes/persona.service';
import { Persona } from 'src/app/modelos/persona';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio:any;
  personaURL:any;
  constructor(private datosPortfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data =>{
      //console.log(data); Version anterior con información de assets, data, data.JSON.
      //this.miPortfolio=data; Version anterior con información de assets, data, data.JSON.
      console.log("Datos personales" + JSON.stringify(data))
      this.miPortfolio=data[0]
    });
  }

}
