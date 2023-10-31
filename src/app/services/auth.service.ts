import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iresauth } from '../interfaces/iresauth';
import { Icredenciales } from '../interfaces/icredenciales';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL=environment.apiURL+'auth';
  private readonly llavetoken='token' ;
  private readonly llaveExp='token-exp';
  constructor(private http:HttpClient) { }
  autenticado():Observable<Boolean>{
    const token=localStorage.getItem(this.llavetoken);
    if (!token){
      return of(false)
    }
    let expiracion=localStorage.getItem(this.llaveExp) || new Date('1993-01-01');

    let expiracionfecha = new Date(expiracion)
    if(expiracionfecha<=new Date()){
      this.logout();
      return of(false);
    }
    return of(true);
  }

  logout(){
    localStorage.removeItem(this.llavetoken);
    localStorage.removeItem(this.llaveExp)
  }

  login(icredenciales:Icredenciales):Observable<Iresauth>{
    return this.http.post<Iresauth>(this.apiURL,icredenciales)
  }
  
  guardarToken(iresauth:Iresauth){
    console.log(iresauth)
    localStorage.setItem(this.llavetoken,iresauth.token);
    localStorage.setItem(this.llaveExp,iresauth.expiracion.toString());
  }
}
