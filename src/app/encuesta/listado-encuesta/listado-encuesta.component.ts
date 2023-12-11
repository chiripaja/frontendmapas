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

@Component({
  selector: 'app-listado-encuesta',
  templateUrl: './listado-encuesta.component.html',
  styleUrls: ['./listado-encuesta.component.css']
})
export class ListadoEncuestaComponent implements OnInit {
  provincias: Iprovincia[] = []
  distritos: Idistrito[] = []
  poblados: Ipoblado[] = []
  preguntas: Preguntas[] = []
  respuestas: Irespuestas[] = []

  provinciaServices = inject(ProvinciaService)
  preguntasServices = inject(PreguntasService)
  distritoServices=inject(DistritoService)
  pobladoServices=inject(PobladoService)
  fb = inject(FormBuilder)
  form = this.fb.group({
    1: ['', Validators.required],
    2: ['', Validators.required],
    3: ['', Validators.required],
    4: [''],
    5: [''],
    6: [''],
    7: [''],
    8: [''],
    9: [''],
    10: [''],
    11: [''],
    12: [''],
    13: [''],
    14: [''],
    15: ['']
  })
  ngOnInit(): void {
    this.preguntasServices.findall().subscribe(data => this.preguntas = data)
    this.provinciaServices.findall().subscribe(data => this.provincias = data)
    this.form.valueChanges.subscribe(valores => {
      valores['1'] ? this.buscarDistrito(valores['1']) : null,
      valores['2'] ? this.buscarPoblado(valores['2']) : null
    }
    )
  }
  onSubmit(data: any) {
    this.respuestas = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        this.respuestas.push({
          respuesta: value,
          preguntasid: key
        })
      }
    }
    console.log(this.respuestas)
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
      this.pobladoServices.findByUbigeo(coddistrito).subscribe(data => {
        this.poblados = data
      })
    }
  }

  limpiar() {
    this.form.patchValue({
      2:'',
      3:''
    })

  }
  
}
