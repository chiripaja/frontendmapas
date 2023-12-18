import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  jsonData = {
    "nombre": "Andres Franco Robles Oliveros",
    "cip": 268814,
    "celular": 998857880
  };
}
