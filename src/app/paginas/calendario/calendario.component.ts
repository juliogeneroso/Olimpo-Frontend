import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})

export class CalendarioComponent implements OnInit {
  panelOpenState = false;
  imagePath = "/assets/maintenance.png";
  constructor() { }

  ngOnInit(): void {
  }

}
