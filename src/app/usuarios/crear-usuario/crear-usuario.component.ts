import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  @ViewChild('formularioHijo') formularioHijo?: FormularioUsuarioComponent;
  constructor(private router:Router,private usuarioServices:UsuarioService) {
    
  }


  guardarCambios(usuario:IUsuario){    
 
   this.usuarioServices.create(usuario).subscribe(data=>
      {
        this.formularioHijo?.resetFormulario();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Guardado Correctamente.',
          showConfirmButton: false,
          timer: 1500
        })}
      ,error=>{
        Swal.fire({
          text: error.error.msj,
          icon: 'error'
        })
      })
  }
}
