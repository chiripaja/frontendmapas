import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Iprovincia } from '../interfaces/iprovincia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private apiURL=environment.apiURL+'provincia';
  constructor(private http:HttpClient) { }
  public findall():Observable<Iprovincia[]>{
    return this.http.get<Iprovincia[]>(this.apiURL);
  }
}
