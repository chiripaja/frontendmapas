import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Idistrito } from 'src/app/interfaces/idistrito';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { Iprovincia } from 'src/app/interfaces/iprovincia';
import { DistritoService } from 'src/app/services/distrito.service';
import { PobladoService } from 'src/app/services/poblado.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

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
  distritoServices=inject(DistritoService)
  pobladoServices=inject(PobladoService)
  fb = inject(FormBuilder)

  form = this.fb.group({
    respprov: ['', Validators.required],
    resdistrito: ['', Validators.required],
    respccpp: ['',Validators.required],
    idproyecto: ['', Validators.required],   
  })

  ngOnInit(): void {
    this.provinciaServices.findall().subscribe(data => this.provincias = data) 
    this.form.valueChanges.subscribe(valores => {    
      valores.respprov ? this.buscarDistrito(valores.respprov) : null,
      valores.resdistrito ? this.buscarPoblado(valores.resdistrito) : null
    })
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
    console.log("entrando...")
    this.distritos = []
    this.poblados = []
    this.form.patchValue({
      resdistrito:'',
    })
  }

  onSubmit(){
      
  
  }

}
