import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private  http:HttpClient) { }

  private apiURL=environment.apiURL+'user';

  public findAll(): Observable<IUsuario[]>{
    return this.http.get<IUsuario[]>(this.apiURL);
  }

  public findByID(id:number):Observable<IUsuario>{
    return this.http.get<IUsuario>(`${this.apiURL}/${id}`);
  }

  public create(usuario:IUsuario){
    return this.http.post(this.apiURL,usuario)
  }
  
}
