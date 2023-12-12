import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Idistrito } from 'src/app/interfaces/idistrito';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { Iprovincia } from 'src/app/interfaces/iprovincia';
import { Irespuestas } from 'src/app/interfaces/irespuestas';
import { Preguntas } from 'src/app/interfaces/preguntas';
import { DistritoService } from 'src/app/services/distrito.service';
import { PobladoService } from 'src/app/services/poblado.service';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { RespuestaService } from 'src/app/services/respuesta.service';

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit {
  provincias: Iprovincia[] = []
  distritos: Idistrito[] = []
  poblados: Ipoblado[] = []
  respuestas?: Irespuestas

  provinciaServices = inject(ProvinciaService)
  distritoServices=inject(DistritoService)
  pobladoServices=inject(PobladoService)
  respuestaServices=inject(RespuestaService)

  fb = inject(FormBuilder)
  form = this.fb.group({
    respprov: ['', Validators.required],
    resdistrito: ['', Validators.required],
    respccpp: ['', Validators.required],
    respiiee: [''],
    resinternet: [''],
    ressproveedor: [''],
    resvelocidad: [''],
    respermite: [''],
    resproblem: [''],
    resresponsable: [''],
    rescosto: [''],
    resnomape: [''],    
    ressexo: [''],
    resnumcelular: [''],
    rescorreo: ['']
  })
  ngOnInit(): void {
  
    this.provinciaServices.findall().subscribe(data => this.provincias = data)
    this.form.valueChanges.subscribe(valores => {
      valores.respprov ? this.buscarDistrito(valores.respprov) : null,
      valores.resdistrito ? this.buscarPoblado(valores.resdistrito) : null
    }
    )
  }
  onSubmit() {      
    this.respuestas=this.form.value
    console.log(this.form.value)
    this.respuestaServices.create(this.respuestas).subscribe(data=>console.log(data))
  
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

  limpiar() {
    this.form.patchValue({
      resdistrito:'',
      respccpp:''
    })

  }
  
}
