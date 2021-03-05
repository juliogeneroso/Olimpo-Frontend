import { Component, OnInit } from '@angular/core';

interface tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.component.html',
  styleUrls: ['./entrada-saida.component.css']
})
export class EntradaSaidaComponent implements OnInit {

  tipos: tipo[] = [
    {value: '0', viewValue: 'Residente'},
    {value: '1', viewValue: 'Serviços'},
    {value: '2', viewValue: 'Visitante'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
