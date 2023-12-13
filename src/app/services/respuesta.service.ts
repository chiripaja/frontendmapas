import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Irespuestas } from '../interfaces/irespuestas';
import { Ireporteencuesta } from '../interfaces/ireporteencuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  private apiURL=environment.apiURL+'respuesta';
  private http=inject(HttpClient)
  
  public create(usuario:Irespuestas){
    return this.http.post(this.apiURL,usuario)
  }

  public findall():Observable<Ireporteencuesta[]>{
    return this.http.get<Ireporteencuesta[]>(this.apiURL);
  }

}
