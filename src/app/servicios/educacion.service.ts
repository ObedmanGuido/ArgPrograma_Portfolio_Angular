import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerEducacion():Observable<any>{
    return this.http.get(this.URL+1+'/educacion/lista');
  }

  crearEducacion(educacion: any):Observable<any> {
    return this.http.post(this.URL+1+'/educacion/nuevo', educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete(this.URL+'educacion/borrar/'+id)
  }

  actualizarEducacion(id: number, educacion: any): Observable<any> {
    return this.http.put(this.URL+'educacion/actualizar/'+id, educacion)
  }
}