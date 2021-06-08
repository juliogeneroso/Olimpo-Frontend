import { Component } from '@angular/core';


@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.css']
})
export class ComunicadosComponent {
  panelOpenState = false;

  imagePath = "/assets/maintenance.png";
}
