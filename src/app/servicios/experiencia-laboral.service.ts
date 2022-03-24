import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {
  URL = 'http://localhost:8080/api/experiencia-laboral/';
  constructor(private http:HttpClient) { }

  obtenerExperienciaLaboral():Observable<any>{
    return this.http.get(this.URL+'lista');
  }

  crearExperienciaLaboral(experiencialaboral: any):Observable<any> {
    return this.http.post(this.URL+'nuevo', experiencialaboral);
  }
}