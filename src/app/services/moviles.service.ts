import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Imoviles} from '../interfaces/imoviles';
@Injectable({
  providedIn: 'root'
})
export class MovilesService {
  private apiURL=environment.apiURL+'moviles';
  private http=inject(HttpClient)
  public findByMovilesCentroPoblacion(id:any):Observable<Imoviles[]>{
    return this.http.get<Imoviles[]>(`${this.apiURL}/${id}`);
  }
 
}
