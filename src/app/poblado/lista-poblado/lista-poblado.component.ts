import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { PobladoService } from 'src/app/services/poblado.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-lista-poblado',
  templateUrl: './lista-poblado.component.html',
  styleUrls: ['./lista-poblado.component.css']
})
export class ListaPobladoComponent implements AfterViewInit{
  poblados: Ipoblado[]=[]
  datasource:any;
  displayedColumns: string[] = ['distrito', 'centro_poblado', 'categoria','electricidad'];
  loading: boolean = true;
  selectedElectricidadOption: string = '';
  pobladoOriginal:Ipoblado[]=[]
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  constructor(private pobladoServices:PobladoService) {        
  }
  ngAfterViewInit(): void {
    this.pobladoServices.findAll().subscribe(data=>{
      this.poblados=data;
      this.pobladoOriginal=data;
      this.datasource=new MatTableDataSource<Ipoblado>(this.poblados);
      this.datasource.paginator=this.paginator;
      this.datasource.sort=this.sort;
      this.loading = false;
    })
  }
  


  Filter(data:any){
    const value=(data.target as HTMLInputElement).value;
   this.datasource.filter=value;
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
    this.saveAsExcelFile(excelBuffer, 'datos_mtc');
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

  applyFilter() {
    if(this.selectedElectricidadOption==='s'){
      this.datasource.data=this.pobladoOriginal
    }
    else{
      const datosFiltrados = this.poblados.filter(poblado => poblado.electricidad === this.selectedElectricidadOption);
      this.datasource.data = datosFiltrados;
      this.datasource.paginator?.firstPage();
    }
 
  }
}
