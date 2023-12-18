import { CanActivateFn, Router } from '@angular/router';
import {  inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authenticateGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const hasToken=()=> {
    return !!localStorage.getItem('token');
  }
  if(hasToken()){
    const authServices=inject(AuthService)
    const token=localStorage.getItem('token')!
    const dataToken=JSON.parse(atob(token.split('.')[1]))
    const fechaexpiracion = new Date(dataToken.exp*1000);
    if(new Date()>=fechaexpiracion){
      authServices.logout()
      return false;
    }
    if (localStorage.getItem('token')) {
      return true;
    } else {
      router.navigate(['/']); // Redirige a la página de inicio de sesión si no es un administrador
      return false;
    }
  }
 else{
  router.navigate(['/']);
  return false
 }
};
