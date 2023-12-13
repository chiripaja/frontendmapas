import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iproyecto } from 'src/app/interfaces/iproyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-listado-proyecto',
  templateUrl: './listado-proyecto.component.html',
  styleUrls: ['./listado-proyecto.component.css']
})
export class ListadoProyectoComponent implements OnInit{
 
  proyectoLista: Iproyecto[]=[];
  datasource:any;  
  ColumnasMostrar = ['id','nomproyec','fechaini','fechafin','poblados','eliminar'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  proyectoServices=inject(ProyectoService)

  ngOnInit(): void {
    this.cargarData()
  }
  


  cargarData():void{
    this.proyectoServices.findAll().subscribe(userdata => {
      this.proyectoLista = userdata;    
      this.datasource=new MatTableDataSource<Iproyecto>(this.proyectoLista);  
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
        this.proyectoServices.delete(id).subscribe(data=>{
          this.cargarData()
        });
        Swal.fire({
          title: "Eliminado!",
          text: "Este proyecto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


}
