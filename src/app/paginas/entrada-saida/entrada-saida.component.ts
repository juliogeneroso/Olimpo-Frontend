import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.component.html',
  styleUrls: ['./entrada-saida.component.css']
})
export class EntradaSaidaComponent implements OnInit {

  constructor(){}

  public teste;

  ngOnInit(): void {
  }
  /*horaCompleta:string;
  horas: number = 0;
  minutos: number = 0;
  segundos: number = 0;
  interval;

  public listaTemp;

 
  startTimer() {
    this.interval = setInterval(() => {
      if(this.segundos<60) {
        this.segundos++;
      } else {
        this.segundos = 0;
        this.minutos++;
          if(this.minutos==60){
            this.horas++;
          }
      }
      this.horaCompleta = this.horas+":"+this.minutos+":"+this.segundos;
    },1000)
    
  }

  pauseTimer() {
    clearInterval(this.interval);
  }*/
}

 
