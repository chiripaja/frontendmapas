import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
  router = inject(Router)
  modelo?:IUsuario
  constructor(
    private usuarioServices:UsuarioService,
    private activatedRoute:ActivatedRoute
    ) {  
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{  
      this.usuarioServices.findByID(params['id']).subscribe(data=>{
          this.modelo=data
      })
    })
  }

  guardarCambios(usuario:IUsuario){
    this.activatedRoute.params.subscribe(params=>{  
      this.usuarioServices.update(params['id'],usuario).subscribe(data=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario Modificado Correctamente.',
          showConfirmButton: false,
          timer: 1500
        }).then((data)=>{
          this.router.navigate(['/admin/usuario'])
        })
      })      
      
     
    })
 
  }
}
