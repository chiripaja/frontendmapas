import { CanActivateFn, Router } from '@angular/router';
import {  inject } from '@angular/core';
export const logeatedGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const hasToken=()=> {
    return !!localStorage.getItem('token');
  }
  
  if (hasToken()) {
    router.navigate(['/admin/Mapa']);
    return false; 
  } else {
    return true; 
  }

 
};
