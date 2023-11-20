import { Component,OnInit,ViewChild,ElementRef,AfterViewInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-pruebamapa',
  templateUrl: './pruebamapa.component.html',
  styleUrls: ['./pruebamapa.component.css']
})
export class PruebamapaComponent implements OnInit{
  
  
  onMapReady(map: L.Map) {
    this.map = map;

    // Ahora puedes acceder a this.map y realizar operaciones en el mapa
  }

  map?: L.Map;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }),
    ],
    zoom: 10,
    center: L.latLng(-9.934620137364014, -76.25057908706368),
  };
  layers = [];

  ngOnInit() {
    
    const bounds = L.latLngBounds(L.latLng(51.48, -0.20), L.latLng(51.52, -0.05));
    this.fitBounds(bounds);
  }

  handleClick(event: L.LeafletMouseEvent) {
    var bounds = new L.LatLngBounds(
      [-10.01110935, -76.94782811],
      [-10.01110935, -76.94782811]
    );

    if(this.map){
      
      this.map.fitBounds(bounds,{maxZoom:10})
      console.log(event)
    }
   
    // Handle click event if needed
  }

  fitBounds(bounds: L.LatLngBounds) {
   
    //this.options.fitBounds = bounds;
    
  }
}
