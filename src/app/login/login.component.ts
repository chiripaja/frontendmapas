import { Component } from '@angular/core';
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
 
  form=this.fb.group({
    usuario:['',Validators.required],
    password:['',Validators.required]
  })
  constructor(
    private fb:FormBuilder,
    private authservices:AuthService,
    private router:Router) {
  }
  onSubmit(credenciales:Icredenciales){
    console.log(new Date())
    this.authservices.login(credenciales).subscribe(data=>{
      this.authservices.guardarToken(data);
      this.router.navigate(['/admin'])
    })
  }
}
