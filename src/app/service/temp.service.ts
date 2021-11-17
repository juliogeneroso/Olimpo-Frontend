import { Injectable, EventEmitter } from '@angular/core';
import { Formulario } from './conexao.model';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  emitir = new EventEmitter<Formulario>();
  static novaEntrada = new EventEmitter<Formulario>();
  static novaSaida = new EventEmitter<Formulario>();
  

  constructor() {
  }
  
    entrada(temp:Formulario){
      TempService.novaEntrada.emit(temp);
      this.emitir.emit(temp);
    }
    saida(temp:Formulario){
      TempService.novaSaida.emit(temp);
      this.emitir.emit(temp);
    }
}

//https://www.youtube.com/watch?v=R9afVKty3Dg