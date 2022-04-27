import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerSkill():Observable<any>{
    return this.http.get(this.URL+1+'/skill/lista');
  }

  crearSkill(skill: any):Observable<any> {
    return this.http.post(this.URL+1+'/skill/nuevo', skill);
  }

  borrarSkill(id: number): Observable<any> {
    return this.http.delete(this.URL+'skill/borrar/'+id)
  }

  actualizarSkill(id: number, skill: any): Observable<any> {
    return this.http.put(this.URL+'skill/actualizar/'+id, skill)
  }
}