import { Component,Input } from '@angular/core';
import { Ipoblado } from 'src/app/interfaces/ipoblado';

@Component({
  selector: 'app-pobladoinfo',
  templateUrl: './pobladoinfo.component.html',
  styleUrls: ['./pobladoinfo.component.css']
})
export class PobladoinfoComponent {
  @Input() poblado?:Ipoblado
}
