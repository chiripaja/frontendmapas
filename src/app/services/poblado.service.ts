import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipoblado } from '../interfaces/ipoblado';
import { Ipobladoreporte } from '../interfaces/ipobladoreporte';

@Injectable({
  providedIn: 'root'
})
export class PobladoService {
  private apiURL=environment.apiURL+'poblado';
  constructor(private http:HttpClient) { }
  public findByUbigeo(id:any):Observable<Ipoblado[]>{
    return this.http.get<Ipoblado[]>(`${this.apiURL}/findByUbigeo/${id}`);
  }
  public findAll():Observable<Ipoblado[]>{
    return this.http.get<Ipoblado[]>(this.apiURL)
  }
  public findByUbigeoName(id:any):Observable<Ipoblado[]>{
    return this.http.get<Ipoblado[]>(`${this.apiURL}/findByUbigeoName/${id}`);
  }
  public findAllReporte():Observable<Ipobladoreporte[]>{
    return this.http.get<Ipobladoreporte[]>(`${this.apiURL}/reporte/data`)
  }
}
