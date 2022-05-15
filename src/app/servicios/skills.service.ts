import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timeout } from 'rxjs';
import { SkillTipo } from '../modelos/skill-tipo.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  URL = 'http://localhost:8080/api/personas/';
  constructor(private http:HttpClient) { }

  obtenerSkill():Observable<any>{
    return this.http.get(this.URL+1+'/skill/lista').pipe(timeout(1800000));
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

  obtenerSkillTipo():Observable<SkillTipo[]>{
    return this.http.get<SkillTipo[]>(this.URL+'skill/tipo/lista').pipe(timeout(1800000))
  }
}