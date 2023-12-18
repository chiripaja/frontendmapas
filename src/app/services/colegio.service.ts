import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icolegio } from '../interfaces/icolegio';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {
  private apiURL=environment.apiURL+'colegio';
  private http=inject(HttpClient)
  public findByCodigoUbicacionGeografica(id:any):Observable<Icolegio[]>{
    return this.http.get<Icolegio[]>(`${this.apiURL}/findByCodigoUbicacionGeografica/${id}`);
  }
}
