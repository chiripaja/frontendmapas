import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  estaLogueado():Observable<boolean> {
    return of(false);
  }
}
