import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { EducacionEstado } from '../modelos/educacion-estado.model';
import { EducacionTipo } from '../modelos/educacion-tipo.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerEducacion():Observable<any>{
    return this.http.get(this.URL+1+'/educacion/lista').pipe(timeout(1800000));
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

  obtenerEducacionTipo():Observable<EducacionTipo[]>{
    return this.http.get<EducacionTipo[]>(this.URL+'educacion/tipo/lista').pipe(timeout(1800000))
  }

  obtenerEducacionEstado():Observable<EducacionEstado[]>{
    return this.http.get<EducacionEstado[]>(this.URL+'educacion/estado/lista').pipe(timeout(1800000))
  }
}