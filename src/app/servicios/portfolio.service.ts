import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../modelos/persona.model';

/*@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }
} Version previa con JSON.*/


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerPersona():Observable<Persona>{
    return this.http.get<Persona>(this.URL+'individuo/'+1);
  }

  actualizarPersona(persona: any): Observable<any> {
    return this.http.put(this.URL+'actualizar/'+1, persona)
  }

}