import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Iproyecto } from 'src/app/interfaces/iproyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { ProyectodetalleService } from 'src/app/services/proyectodetalle.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-listado-proyecto',
  templateUrl: './listado-proyecto.component.html',
  styleUrls: ['./listado-proyecto.component.css'],
})
export class ListadoProyectoComponent implements OnInit {
  proyectoLista: Iproyecto[] = [];
  datasource: any;
  ColumnasMostrar = [
    'id',
    'nomproyec',
    'fechaini',
    'fechafin',
    'poblados',
    'exportar',
    'eliminar',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  proyectoServices = inject(ProyectoService);
  proyectoDetalleServices = inject(ProyectodetalleService);
  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.proyectoServices.findAll().subscribe(
      (userdata) => {
        this.proyectoLista = userdata;
        this.datasource = new MatTableDataSource<Iproyecto>(this.proyectoLista);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
      },
      (error) => console.error(error)
    );
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Desea Eliminar Usuario?',
      text: 'Este proceso no podra ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectoServices.delete(id).subscribe((data) => {
          this.cargarData();
        });
        Swal.fire({
          title: 'Eliminado!',
          text: 'Este proyecto ha sido eliminado.',
          icon: 'success',
        });
      }
    });
  }

  exportarexcel(data: any) {
    this.proyectoDetalleServices.findDataExcel(data).subscribe((data) => {
      console.log(data);


      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
  // Obtén las celdas de la cabecera (supongamos que están en la fila 1)
  const headerCells = Object.keys(worksheet).filter(key => key.startsWith('A1'));

  // Aplica estilos a las celdas de la cabecera
  headerCells.forEach(cell => {
    worksheet[cell].s = { font: { bold: true }, border: { bottom: { style: 'thin' } } };
  });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'proyectos_mtc');
    });
  }



  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.href = window.URL.createObjectURL(data);
    a.download = `${fileName}.xlsx`;
    a.click();
    document.body.removeChild(a);
  }
}
