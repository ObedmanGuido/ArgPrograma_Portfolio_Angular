import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerProyecto():Observable<any>{
    return this.http.get(this.URL+1+'/proyecto/lista');
  }

  crearProyecto(proyecto: any):Observable<any> {
    return this.http.post(this.URL+1+'/proyecto/nuevo', proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete(this.URL+'proyecto/borrar/'+id)
  }

  actualizarProyecto(id: number, proyecto: any): Observable<any> {
    return this.http.put(this.URL+'proyecto/actualizar/'+id, proyecto)
  }
}