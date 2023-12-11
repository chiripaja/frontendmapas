import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Preguntas } from '../interfaces/preguntas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  private apiURL=environment.apiURL+'encuesta';
  private http=inject(HttpClient)

  public findall():Observable<Preguntas[]>{
    return this.http.get<Preguntas[]>(this.apiURL)
  }
  
}
