import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="http://localhost:8080/api/" //URL de la API.
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    //return this.http.get('./assets/data/data.json'); Versión anterior que la información del portfolio viene de un JSON dentro de assets, data, data.JSON.
    return this.http.get(this.url+'/personas'); //Repetir por component de la API.
  }
}
