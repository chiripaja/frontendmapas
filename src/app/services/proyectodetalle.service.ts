import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Iproyectodetalle } from '../interfaces/iproyectodetalle';
import { Iproyectodetalledto } from '../interfaces/iproyectodetalledto';

@Injectable({
  providedIn: 'root'
})

export class ProyectodetalleService {
  private http=inject(HttpClient)
  private apiURL=environment.apiURL+'proyectoDetalle';
  public create(proyectoDetalle:Iproyectodetalle){   
    return this.http.post(this.apiURL,proyectoDetalle)
  }

  public delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  public findata(id:number){
    return this.http.get<Iproyectodetalledto[]>(`${this.apiURL}/findData/${id}`)
  }

  public findDataExcel(id:number){
    return this.http.get<Iproyectodetalledto[]>(`${this.apiURL}/findDataExcel/${id}`)
  }
  
}
