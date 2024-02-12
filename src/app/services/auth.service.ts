import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icredenciales } from '../interfaces/icredenciales';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiURL=environment.apiURL+'user/auth';
  private readonly llavetoken='token' ;
  private readonly llaveExp='token-exp';
  constructor(private http:HttpClient) { }



  autenticado():Observable<Boolean>{
    const token=localStorage.getItem(this.llavetoken);
    if (!token){
      return of(false)
    }
    const expiracion:any=localStorage.getItem(this.llaveExp);   
    let expiracionfecha = new Date(expiracion*1000)
    if(expiracionfecha<=new Date()){
      this.logout();
      return of(false);
    }
    return of(true);
  }
  

  logout(){
    localStorage.removeItem(this.llavetoken);
  }

  login(icredenciales:Icredenciales):Observable<any>{
    return this.http.post<any>(this.apiURL,icredenciales)
  }
  
  guardarToken(data:string){
    localStorage.setItem(this.llavetoken,data);  
  }

}
