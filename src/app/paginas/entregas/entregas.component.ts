import { Component } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { ConexaoService } from '../../service/conexao.service';
import { Entrega } from '../../service/conexao.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SalvoComponent } from '../../avisos/salvo/salvo.component';
import { ErroComponent } from '../../avisos/erro/erro.component';



interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css'],
})
export class EntregasComponent {

  public observacao:boolean; //Utilizado no html com *ngIf, caso positivo -> exibirá um campo na forma de input para observação

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar){}

  durationInSeconds = 5;
  carregando:boolean = false;
  imagePath = "/assets/load.gif";

  checkoutForm = this.formBuilder.group({
    viewValue: '',
    bloco: '',
    num: '',
    obs:''
  });

  tipos: Tipo[] = [
    {value: '0', viewValue: 'Delivery'},
    {value: '1', viewValue: 'Cartas'},
    {value: '2', viewValue: 'Mercadorias'},
    {value: '3', viewValue: 'Farmácia'}
  ];

  selectedTipo = this.tipos[0].viewValue;

  restantes:Entrega[] = [
  ];

  concluidas:Entrega[] = [
  ];

  //Função usava para exibir campo input de Observação, lembrando que obervação não necessária para registro
 adicionarOBS(){
   if(this.observacao){
    this.observacao = false;
   }else{
     this.observacao = true;
   }
   console.log(this.observacao);

 }

 openSnackBar() {
  this.snackBar.openFromComponent(SalvoComponent, {
    duration: this.durationInSeconds * 500,
  });
}
  erroSnackBar(){
    this.carregando = false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  onSubmit(){
    this.carregando = true;
    this.checkoutForm.value.bloco = this.checkoutForm.value.bloco.toUpperCase(); //Convertendo para letra Maiuscula para manter padrão no banco de dados.
    this.conexao.entregasPendentes(this.checkoutForm).then(()=>{//Acionando service de conexao com Node.
      this.restantes.push(this.checkoutForm.value); //Caso saia tudo da forma correta, é acionado o push no vetor.
      this.restantes = this.restantes.slice().reverse().slice(0,4);
    }).then(()=>{
      this.carregando = false;
      this.openSnackBar();
    }).catch(()=>{
      this.erroSnackBar();
    });  
  }
}

