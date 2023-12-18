import { Component,Input, OnInit, inject,OnChanges, SimpleChanges } from '@angular/core';
import { Imoviles } from 'src/app/interfaces/imoviles';
import { Ipoblado } from 'src/app/interfaces/ipoblado';
import { MovilesService } from 'src/app/services/moviles.service';

@Component({
  selector: 'app-pobladoinfo',
  templateUrl: './pobladoinfo.component.html',
  styleUrls: ['./pobladoinfo.component.css']
})
export class PobladoinfoComponent implements OnChanges {
  moviles:Imoviles[]=[]!
  @Input() poblado?:Ipoblado
  movilesServices=inject(MovilesService)
  ngOnChanges(changes: SimpleChanges): void {  
    if(this.poblado?.ubigeo_ccpp){
      this.movilesServices.findByMovilesCentroPoblacion(this.poblado.ubigeo_ccpp).subscribe(
        data=>{
          this.moviles=data
        }
      )
    }
  }
  
 
  
}
