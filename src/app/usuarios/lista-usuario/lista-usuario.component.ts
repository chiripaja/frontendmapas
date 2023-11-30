import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  UsuarioLista: IUsuario[]=[];
  datasource:any;  
  ColumnasMostrar = ['id','usuario','password','rol','acciones'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
  
    this.usuarioService.findAll().subscribe(userdata => {
      this.UsuarioLista = userdata;    
      this.datasource=new MatTableDataSource<IUsuario>(this.UsuarioLista);  
      this.datasource.paginator=this.paginator
      this.datasource.sort=this.sort
    }, error => console.error(error));

  
  }

 

}
