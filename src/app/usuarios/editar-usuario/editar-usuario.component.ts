import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{

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

  guardarCambios(usuario:IUsuario){}
}
