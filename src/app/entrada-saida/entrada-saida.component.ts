import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../service/conexao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SalvoComponent } from '../avisos/salvo/salvo.component';
import { ErroComponent } from '../avisos/erro/erro.component';



interface Tipo {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.component.html',
  styleUrls: ['./entrada-saida.component.css']
})
export class EntradaSaidaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar){}

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregandoEntrada:boolean = false;
  carregandoSaida:boolean = false;

  //Entrada
  EntrarForm = this.formBuilder.group({
    viewValueEntrada: '',
    nomeCompleto: '',
    bloco:'',
    casa: '',
  });
  
  //controle de entrada --- ok 
  tiposEntrada: Tipo[] = [
    {value: '0', viewValue: 'Residente'},
    {value: '1', viewValue: 'Serviços'},
    {value: '2', viewValue: 'Visitante'}
  ];
  selectedTipoEntrada = this.tiposEntrada[0].viewValue; 
  //Fim Entrada

  //Saída 
  SaidaForm = this.formBuilder.group({
    viewValueSaida: '',
    nomeCompleto: '',
    bloco:'', 
    casa: '',
  });
  /*controle saida----ok */
  tiposSaida: Tipo[] = [
    {value: '0', viewValue: 'Residente'},
    {value: '1', viewValue: 'Serviços'},
    {value: '2', viewValue: 'Visitante'}
  ];
  selectedTipoSaida = this.tiposSaida[0].viewValue;
  //Fim Saída
  
  entradas = [];
  saidas = [];


  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }
  erroSnackBarEntrada() {
    this.carregandoEntrada=false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }
  erroSnackBarSaida() {
    this.carregandoSaida=false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  ultimaEntrada = [];
  ultimaSaida = [];

  ngOnInit(): void {
  }

  onSubmitEntrada(){
    this.EntrarForm.value.bloco = this.EntrarForm.value.bloco.toUpperCase(); 
    this.conexao.entrada(this.EntrarForm);
    this.entradas.push(this.EntrarForm.value['viewValueEntrada']+" ( "+"Bloco "+this.EntrarForm.value['bloco'].toUpperCase()+" AP "+this.EntrarForm.value['casa']+"º"+" ) - "+this.EntrarForm.value['nomeCompleto']);
    this.ultimaEntrada = this.entradas.slice().reverse().slice(0,4);
  }

  onSubmitSaida(){
    this.carregandoSaida = true;
    this.SaidaForm.value.bloco = this.SaidaForm.value.bloco.toUpperCase(); 
    this.conexao.saida(this.SaidaForm).then(() => {
    this.saidas.push(this.SaidaForm.value['viewValueSaida']+" ( "+"Bloco "+this.SaidaForm.value['bloco'].toUpperCase()+" AP "+this.SaidaForm.value['casa']+"º"+" ) - "+this.SaidaForm.value['nomeCompleto']);
    this.ultimaSaida = this.saidas.slice().reverse().slice(0,4);
    })
  }
}


