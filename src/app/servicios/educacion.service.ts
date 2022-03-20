import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  URL = 'http://localhost:8080/api/educacion/';
  constructor(private http:HttpClient) { }

  obtenerEducacion():Observable<any>{
    return this.http.get(this.URL+'lista');
  }
}