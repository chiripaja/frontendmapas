import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  UsuarioLista: IUsuario[]=[]
  ColumnasMostrar = ['id','usuario','password','rol','acciones'];
  
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(userdata => {
      this.UsuarioLista = userdata;    
      console.log(userdata)
    }, error => console.error(error));

  
  }

 

}
