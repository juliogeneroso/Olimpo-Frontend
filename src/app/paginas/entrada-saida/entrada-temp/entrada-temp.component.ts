import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Formulario } from 'src/app/service/conexao.model';
import { ConexaoService } from 'src/app/service/conexao.service';
import { TempService } from 'src/app/service/temp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvoComponent } from 'src/app/avisos/salvo/salvo.component';
import { ErroComponent } from 'src/app/avisos/erro/erro.component';

@Component({
  selector: 'app-entrada-temp',
  templateUrl: './entrada-temp.component.html',
  styleUrls: ['./entrada-temp.component.css'],
  providers: [TempService]
})
export class EntradaTempComponent implements OnInit,AfterViewInit {

  public entradaTemporaria = new Array<Formulario>();

  constructor(public temp:TempService, public conexaoService:ConexaoService,private snackBar: MatSnackBar) {
    this.entradaTemporaria = [];
   }

  durationInSeconds = 2;

  ngOnInit(){
    this.conexaoService.getEntradaTemp().subscribe(incluir => {
      const response = (incluir as any);
      this.entradaTemporaria = response;
    });
  }

  ngAfterViewInit(){
    TempService.novaEntrada.subscribe(incluir => {
      this.entradaTemporaria.push(incluir)
      //console.log(this.entradaTemporaria);
    });

  }

  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }
  erroSnackBarSaida() {
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }
  
  sair_temp(temp){
    this.conexaoService.saida(temp).then(()=>{
      let indice = this.entradaTemporaria.indexOf(temp);
      this.conexaoService.tempSaida(temp).then(()=> {
        while(indice>=0){
          this.entradaTemporaria.splice(indice,1);
          indice = this.entradaTemporaria.indexOf(temp);
        }
      });
    }).then(()=>{
      this.temp.saida(temp);
    }).then(()=>{
      this.openSnackBar();
    }).catch(()=>{
      console.log('erro');
    });
  }

}
