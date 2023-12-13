import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ireporteencuesta } from 'src/app/interfaces/ireporteencuesta';
import { RespuestaService } from 'src/app/services/respuesta.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-reporte-encuesta',
  templateUrl: './reporte-encuesta.component.html',
  styleUrls: ['./reporte-encuesta.component.css']
})
export class ReporteEncuestaComponent implements AfterViewInit {
  respuestaServices = inject(RespuestaService)
  respuestas: Ireporteencuesta[] = []
  datasource: any;
  //displayedColumns: string[] = ['id', 'provincia', 'distrito', 'NombreIE', 'NivelModalidad', 'resinternet', 'ressproveedor', 'respproveedorotro', 'resvelocidad', 'respermite', 'resproblem', 'resproblemotro', 'resresponsable', 'rescosto', 'resnomape', 'ressexo', 'resnumcelular', 'rescorreo'];
  displayedColumns: string[] = [ 'provincia', 'distrito', 'NombreIE', 'NivelModalidad', 'resinternet', 'ressproveedor', 'respproveedorotro', 'resvelocidad', 'respermite', 'resproblem', 'resproblemotro', 'resresponsable', 'rescosto'];
  loading: boolean = true;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.respuestaServices.findall().subscribe(data => {
      this.respuestas = data;
      this.datasource = new MatTableDataSource<Ireporteencuesta>(this.respuestas);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      this.loading = false;
    })
  }


  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.datasource.filteredData);

    // Obtén las celdas de la cabecera (supongamos que están en la fila 1)
    const headerCells = Object.keys(worksheet).filter(key => key.startsWith('A1'));

    // Aplica estilos a las celdas de la cabecera
    headerCells.forEach(cell => {
      worksheet[cell].s = { font: { bold: true }, border: { bottom: { style: 'thin' } } };
    });
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'datos_encuesta');
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
  Filter(data:any){
    const value=(data.target as HTMLInputElement).value;
   this.datasource.filter=value;
  }

}
