import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { Persona } from '../modelos/persona.model';
import { Provincia } from '../modelos/provincia.model';

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
    return this.http.get<Persona>(this.URL+'individuo/'+1).pipe(timeout(1800000));
  }

  actualizarPersona(persona: any): Observable<any> {
    return this.http.put(this.URL+'actualizar/'+1, persona)
  }

  obtenerProvincias():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.URL+'provincia/lista').pipe(timeout(1800000))
  }
}