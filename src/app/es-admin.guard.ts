import { CanActivateFn, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './services/auth.service';




export const esAdminGuard: CanActivateFn = (route, state) => {
    let response: any = false
    const authServices = inject(AuthService);
    const router = inject(Router)
    authServices.autenticado().subscribe(data => {
        if (data) {
            response = true;
        } else {
            router.navigate(['/']);
            response = false;
        }
    });
    return response;
};
