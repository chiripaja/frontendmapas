import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsuario } from 'src/app/interfaces/iusuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  UsuarioLista: IUsuario[]=[];
  datasource:any;  
  ColumnasMostrar = ['id','usuario','password','nombre','editar','eliminar'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {  
     this.cargarData()
  }
  cargarData():void{
    this.usuarioService.findAll().subscribe(userdata => {
      this.UsuarioLista = userdata;    
      this.datasource=new MatTableDataSource<IUsuario>(this.UsuarioLista);  
      this.datasource.paginator=this.paginator
      this.datasource.sort=this.sort
    }, error => console.error(error)); 
  }
  eliminar(id:number){
    Swal.fire({
      title: "¿Desea Eliminar Usuario?",
      text: "Este proceso no podra ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe(data=>{
          this.cargarData()
        });
        Swal.fire({
          title: "Eliminado!",
          text: "Este usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

 

}
