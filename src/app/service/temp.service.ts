import { Injectable, EventEmitter } from '@angular/core';
import { Form } from '@angular/forms';
import { Formulario } from './conexao.model';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  emitir = new EventEmitter<Formulario>();
  static novaEntrada = new EventEmitter<Formulario>();
  
  public entradaTemp = new Array<Formulario>();

  constructor() {
    this.entradaTemp = [];
  }

    coletaRegistro(){
      if(this.entradaTemp){
        return this.entradaTemp;
      }
    }
    
    entrada(temp:Formulario){
      this.entradaTemp.push(temp);
     // console.log(this.entradaTemp+" Servico");
      this.emitir.emit(temp);
      TempService.novaEntrada.emit(temp);
    }
}

//https://www.youtube.com/watch?v=R9afVKty3Dg