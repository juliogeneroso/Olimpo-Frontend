import { Component, OnInit, OnDestroy } from '@angular/core';
import { Formulario } from 'src/app/service/conexao.model';
import { TempService } from 'src/app/service/temp.service';

@Component({
  selector: 'app-entrada-temp',
  templateUrl: './entrada-temp.component.html',
  styleUrls: ['./entrada-temp.component.css'],
  providers: [TempService]
})
export class EntradaTempComponent implements OnInit {

  public entradaTemporaria = new Array<Formulario>();

  constructor(public temp:TempService) {
    this.entradaTemporaria = [];
   }

  ngOnInit(){
    this.entradaTemporaria = this.temp.coletaRegistro();  

    TempService.novaEntrada.subscribe(incluir => {
      this.entradaTemporaria.push(incluir),
      console.log(this.entradaTemporaria);
    });
  }

  ngOnDestroy(){
    TempService.novaEntrada.unsubscribe();
  }
}
