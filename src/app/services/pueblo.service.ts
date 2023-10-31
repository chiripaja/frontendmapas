import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipueblo } from '../interfaces/ipueblo';

@Injectable({
  providedIn: 'root'
})
export class PuebloService {
  private apiURL=environment.apiURL+'pueblo';
  constructor(private http:HttpClient) { }
  public findAll(): Observable<Ipueblo[]>{
    return this.http.get<Ipueblo[]>(this.apiURL);
  }
}
