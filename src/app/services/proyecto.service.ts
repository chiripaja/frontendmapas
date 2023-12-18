import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Iproyecto } from '../interfaces/iproyecto';


@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private http=inject(HttpClient)
  private apiURL=environment.apiURL+'proyecto';
  
  public findAll(): Observable<Iproyecto[]>{    
    return this.http.get<Iproyecto[]>(this.apiURL);
  } 

  public create(proyecto:Iproyecto){
    return this.http.post(this.apiURL,proyecto)
  }

  public delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }
  
  public findByID(id:number):Observable<Iproyecto>{
    return this.http.get<Iproyecto>(`${this.apiURL}/${id}`);
  }


}
