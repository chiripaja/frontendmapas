import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCardLgImage } from '@angular/material/card';
import { Icolegio } from 'src/app/interfaces/icolegio';
import { Idistrito } from 'src/app/interfaces/idistrito';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { Iprovincia } from 'src/app/interfaces/iprovincia';
import { Irespuestas } from 'src/app/interfaces/irespuestas';
import { ColegioService } from 'src/app/services/colegio.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { PobladoService } from 'src/app/services/poblado.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RespuestaService } from 'src/app/services/respuesta.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit {
  provincias: Iprovincia[] = []
  distritos: Idistrito[] = []
  poblados: Ipoblado[] = []
  colegios:Icolegio[]=[]
  respuestas?: Irespuestas

  formInternetValidator:boolean=true
  InputProveedorOtro:boolean=false
  InputInternetOtro:boolean=false

  provinciaServices = inject(ProvinciaService)
  distritoServices=inject(DistritoService)
  pobladoServices=inject(PobladoService)
  respuestaServices=inject(RespuestaService)
  colegioServices=inject(ColegioService)

  fb = inject(FormBuilder)
  form = this.fb.group({
    respprov: ['', Validators.required],
    resdistrito: ['', Validators.required],
    respccpp: [''],
    respiiee: ['', Validators.required],
    resinternet: [''],
    ressproveedor: [''],
    respproveedorotro: [''],
    resvelocidad: [''],
    respermite: [''],
    resproblem: [''],
    resproblemotro: [''],
    resresponsable: [''],
    rescosto: [''],
    resnomape: ['', Validators.required],    
    ressexo: [''],
    resnumcelular: ['', Validators.required],
    rescorreo: ['', [Validators.required, Validators.email]]
  })

  ngOnInit(): void {  
    this.provinciaServices.findall().subscribe(data => this.provincias = data)
    this.form.valueChanges.subscribe(valores => {    
      valores.respprov ? this.buscarDistrito(valores.respprov) : null,
      valores.resdistrito ? this.buscarPoblado(valores.resdistrito) : null,
      valores.resdistrito ? this.buscarColegios(valores.resdistrito) : null,
      (valores.resinternet==='SI' || valores.resinternet==='')?this.formInternetValidator=true:this.formInternetValidator=false
      valores.ressproveedor==='OTRO'?this.InputProveedorOtro=true:this.InputProveedorOtro=false
      valores.resproblem==='4'?this.InputInternetOtro=true:this.InputInternetOtro=false
      
    })
  }
  
  onSubmit() {      
    this.respuestas=this.form.value
    this.respuestaServices.create(this.respuestas).subscribe(data=>{
      this.form.reset();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Completado Correctamente.',
        showConfirmButton: false,
        timer: 1500
      })
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
        this.poblados = data
      })
    }
  }


  buscarColegios(coddistrito: any){
    if (coddistrito) {
      this.colegioServices.findByCodigoUbicacionGeografica(coddistrito).subscribe(data => {
        this.colegios=data
      })
    }
  }

  limpiar() {
    console.log("entrando...")
    this.distritos = []
    this.poblados = []
    this.colegios=[]
    this.form.patchValue({
      resdistrito:'',
      respccpp:'',
      respiiee:''
    })
  }


  
}
