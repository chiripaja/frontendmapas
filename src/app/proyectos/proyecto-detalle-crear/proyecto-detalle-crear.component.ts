import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Idistrito } from 'src/app/interfaces/idistrito';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { Iprovincia } from 'src/app/interfaces/iprovincia';
import { Iproyectodetalle } from 'src/app/interfaces/iproyectodetalle';
import { Iproyectodetalledto } from 'src/app/interfaces/iproyectodetalledto';
import { DistritoService } from 'src/app/services/distrito.service';
import { PobladoService } from 'src/app/services/poblado.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ProyectodetalleService } from 'src/app/services/proyectodetalle.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-proyecto-detalle-crear',
  templateUrl: './proyecto-detalle-crear.component.html',
  styleUrls: ['./proyecto-detalle-crear.component.css']
})
export class ProyectoDetalleCrearComponent implements OnInit {
  router = inject(Router)
  provincias: Iprovincia[] = []
  distritos: Idistrito[] = []
  poblados: Ipoblado[] = []
  provinciaServices = inject(ProvinciaService)
  distritoServices = inject(DistritoService)
  pobladoServices = inject(PobladoService)
  proyectodetalleServices = inject(ProyectodetalleService)
  fb = inject(FormBuilder)
  activatedRoute = inject(ActivatedRoute)
  private unsubscribe$ = new Subject<void>();

  proyectodetalledto: Iproyectodetalledto[] = [];

  datasource: any;
  ColumnasMostrar = ['id', 'nomproyec', 'centro_poblado', 'eliminar'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  form = this.fb.group({
    respprov: ['', Validators.required],
    resdistrito: ['', Validators.required],
    respccpp: ['', Validators.required]
  })

  ngOnInit(): void {
    this.provinciaServices.findall().subscribe(data => this.provincias = data)
    this.form.valueChanges.subscribe(valores => {
      valores.respprov ? this.buscarDistrito(valores.respprov) : null,
        valores.resdistrito ? this.buscarPoblado(valores.resdistrito) : null
    })
    this.cargarDatos()
  }

  cargarDatos(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        const idproyecto = params['id'];
      
        this.proyectodetalleServices.findata(idproyecto)
          .subscribe(data => {
            console.log(data)
            this.proyectodetalledto = data; 
            this.datasource = new MatTableDataSource<Iproyectodetalledto>(this.proyectodetalledto);
            this.datasource.paginator = this.paginator
            this.datasource.sort = this.sort
          });



      });
  }


  buscarDistrito(codprov: any) {
    if (codprov) {
      this.distritoServices.findByIdProvincia(codprov).subscribe(data => {
        this.distritos = data
      })
    }
  }

  buscarPoblado(coddistrito: any) {
    if (coddistrito) {
      this.pobladoServices.findByUbigeoName(coddistrito).subscribe(data => {
        console.log(data)
        this.poblados = data
      })
    }
  }


  limpiar() {
    this.distritos = []
    this.poblados = []
    this.form.patchValue({
      resdistrito: '',
    })
  }

  onSubmit() {

    this.activatedRoute.params.subscribe(params => {
      const idproyecto = params['id']
      const proyectoD: Iproyectodetalle = {
        idproyecto: idproyecto,
        idccpp: this.form.value.respccpp
      }
      this.proyectodetalleServices.create(proyectoD).subscribe(data =>{
        this.cargarDatos();
        this.form.reset();
      }
        
      )
    })
  }

  eliminar(id:number){
    Swal.fire({
      title: "¿Desea Eliminar este Elemento?",
      text: "Este proceso no podra ser revertido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminalo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectodetalleServices.delete(id).subscribe(data=>{
          this.cargarDatos()
        });
        Swal.fire({
          title: "Eliminado!",
          text: "Este elemento ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

}
