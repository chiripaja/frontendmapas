import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Idistrito } from '../interfaces/idistrito';
@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  private apiURL=environment.apiURL+'distrito';
  constructor(private http:HttpClient) { }
  public findByIdProvincia(id:any):Observable<Idistrito[]>{
    return this.http.get<Idistrito[]>(`${this.apiURL}/findByIdProvincia/${id}`);
  }
}
