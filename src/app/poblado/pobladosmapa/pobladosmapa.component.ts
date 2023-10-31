import { Component,OnInit } from '@angular/core';
import { Icon, circle, icon, latLng, marker, polygon, tileLayer,Marker, Circle } from 'leaflet';
import { PuebloService } from 'src/app/services/pueblo.service';

@Component({
  selector: 'app-pobladosmapa',
  templateUrl: './pobladosmapa.component.html',
  styleUrls: ['./pobladosmapa.component.css']
})
export class PobladosmapaComponent implements OnInit{
  capas:Marker<any>[]=[];
  circulosDraw:Circle<any>[]=[];

  constructor(private puebloServices:PuebloService) {    
    
  }
  ngOnInit(): void {
    
      this.puebloServices.findAll().subscribe(data=>{   
        data.map(item=>{          
          this.ubicar(this.removeTrailingZeros(item.lat),this.removeTrailingZeros(item.log),item.nombre)
          this.circulos(this.removeTrailingZeros(item.lat),this.removeTrailingZeros(item.log))
        })
      },error=>console.log(error.message))

  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 8,
    center: latLng(-9.63715,-76.709778),
   
  };


  ubicacion(event:any){
    
    const latitud=event.latlng.lat
    const longitud=event.latlng.lng
    
    this.capas.push(marker([latitud,longitud],{
      icon:icon({
        iconSize:[25,41],
        iconAnchor:[13,41],
        iconUrl:'marker-icon.png',
        iconRetinaUrl:'marker-icon.png',
        shadowUrl:'./assets/marker-shadow.png'
      })
    }))
    console.log(latitud,longitud)
  }

  ubicar(lat:any,log:any,nombre:any){
    const marca=marker([lat,log],{
      icon:icon({
        iconSize:[25,41],
        iconAnchor:[13,41],
        iconUrl:'marker-icon.png',
        iconRetinaUrl:'marker-icon.png',
        shadowUrl:'./assets/marker-shadow.png'
      })
    });
    marca.bindPopup(nombre).openTooltip();
    
    this.capas.push(marca);
    
  }

  circulos(lat:any,log:any){ 
       this.circulosDraw.push(circle([ lat  , log ], { radius: 1000 }))
  }

  removeTrailingZeros(number: any): string {
    const strNumber = number.toString();
    const strippedNumber = strNumber.replace(/(\.0+|0+)$/, '');
    return strippedNumber;
  }




}
