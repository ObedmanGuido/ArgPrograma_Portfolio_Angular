import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  URL = 'http://localhost:8080/api/';
  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<any>{
    return this.http.get('./assets/data/data.json');
  }

}