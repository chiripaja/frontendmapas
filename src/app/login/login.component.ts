import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Icredenciales } from '../interfaces/icredenciales';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  hide = true;
  authservices=inject(AuthService)
  router=inject(Router)
  fb=inject(FormBuilder)

  form=this.fb.group({
    usuario:['',Validators.required],
    password:['',Validators.required]
  })

  obtenerErrorCampoNombre(camponom:string){
    var campo=this.form.get(camponom)

    if(campo?.hasError('required')){
      return 'El campo es requerido';
    }
    return ''
  }

  onSubmit(credenciales:Icredenciales){ 
    this.authservices.login(credenciales).subscribe(data=>{
      
      this.authservices.guardarToken(data)
      //this.authservices.guardarToken(data);
      this.router.navigate(['/admin'])
    },
    (error)=>{
      console.log(error.error.message)
    }
    )
  }
}
