import {  Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  circle, icon, latLng, marker, polygon, tileLayer, Marker, Circle, latLngBounds } from 'leaflet';
import * as L from 'leaflet';
import { Idistrito } from 'src/app/interfaces/idistrito';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { Iprovincia } from 'src/app/interfaces/iprovincia';
import { DistritoService } from 'src/app/services/distrito.service';
import { PobladoService } from 'src/app/services/poblado.service';
import { ProvinciaService } from 'src/app/services/provincia.service';


@Component({
  selector: 'app-pobladosmapa',
  templateUrl: './pobladosmapa.component.html',
  styleUrls: ['./pobladosmapa.component.css']
})
export class PobladosmapaComponent implements OnInit {
  latitud1: string = ""
  longitud1: string = ""
  latitud2: string = ""
  longitud2: string = ""
  map?: L.Map;
  DatosCentrosPoblados?: Ipoblado | null;

  capas: Marker<any>[] = [];
  circulosDraw: Circle<any>[] = [];
  provincias: Iprovincia[] = []
  distritos: Idistrito[] = []
  poblados: Ipoblado[] = []
  form = this.fb.group({
    provinciacod: ['', [Validators.required]],
    distritocod: ['', [Validators.required]],
    pobladocod: ['', [Validators.required]]
  })
  constructor(
    private provinciaServices: ProvinciaService,
    private distritoServices: DistritoService,
    private pobladoServices: PobladoService,
    private fb: FormBuilder
  ) {

  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

  ngOnInit(): void {
    this.provinciaServices.findall().subscribe(data => this.provincias = data)
    this.form.valueChanges.subscribe(valores => {
      valores?.provinciacod ? this.buscarDistrito(valores?.provinciacod) : null,
        valores?.distritocod ? this.buscarPoblado(valores?.distritocod) : null,
        valores?.pobladocod ? this.buscarMapaData(valores?.pobladocod) : null
    })
  }


  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(-9.934620137364014, -76.25057908706368),


  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }


  circulos(lat: any, log: any) {
    this.circulosDraw.push(circle([lat, log], { radius: 1000 }))
  }





  buscarDistrito(codprov: any) {   
    if (codprov) {     
      const dato: Iprovincia | undefined = this.provincias.find(provincia => provincia.codigo === codprov);
      dato ? this.ubicarMapa(dato?.latitud1, dato?.longitud1, dato?.latitud2, dato?.longitud2) : ''
      this.distritoServices.findByIdProvincia(codprov).subscribe(data => {
        this.distritos = data
      })
    }

  }

  buscarPoblado(coddistrito: any) {
  if (coddistrito) {      
      const dato: Idistrito | undefined = this.distritos.find(distrito => distrito.codigo === coddistrito);    
      dato ? this.ubicarMapa(dato?.latitud1, dato?.longitud1, dato?.latitud2, dato?.longitud2,11) : ''
      this.pobladoServices.findByUbigeo(coddistrito).subscribe(data => {
        this.poblados = data
      }
      )
    }
  }
  
  buscarMapaData(idpoblado: any) {
    const dato: Ipoblado | undefined =this.DatosCentrosPoblados = this.poblados.find(poblado => poblado.id === idpoblado)    
    dato ? this.ubicarMapa(dato?.latitud,dato.longitud, dato.latitud,dato.longitud,14) : ''
    this.capas = []
    if(dato?.latitud && dato?.longitud && dato.centro_poblado){
      this.capas.push(marker([parseFloat(dato.latitud), parseFloat(dato.longitud)], {
        icon: icon({
          iconSize: [25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon.png',
          shadowUrl: './assets/marker-shadow.png'
        })
      }).bindPopup(`
      <h3>${dato.centro_poblado}</h3>
      <p>Latitud: ${dato.latitud}</p>
      <p>Longitud: ${dato.longitud}</p>
    `).openTooltip())
      
    }
    
  }

 


  ubicarMapa(latitud1: any, longitud1: any, latitud2: any, longitud2: any,zoom:number=10) {
    if (latitud1 && longitud1 && latitud2 && longitud2 && this.map) {
      var bounds = new L.LatLngBounds(
        [parseFloat(latitud1), parseFloat(longitud1)],
        [parseFloat(latitud2), parseFloat(longitud2)]
      );
      this.map.fitBounds(bounds, { maxZoom: zoom }) 
    }
  }



  limpiar() {
    this.form.get('distritocod')?.setValue('');
    this.form.get('pobladocod')?.setValue('');
    this.distritos = []
    this.poblados = []
  }
  guardarCambios(data: any) {
    
  }

  manejarclick($event: L.LeafletMouseEvent) {
    const latitud = $event.latlng.lat;
    const long = $event.latlng.lng;
  }
}
