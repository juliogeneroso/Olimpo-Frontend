import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';



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

  constructor(private formBuilder: FormBuilder){}

  //Entrada
  EntrarForm = this.formBuilder.group({
    viewValueEntrada: '',
    nomeCompleto: '',
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
  


  entradas = [
    'Residente - Julio Cesar - AP 33º',
    'Visitante - Joao Camargo - AP 31º',
    'Serviços - Mario Cesar - AP 23º',
  ];

  saidas = [
    'Residente - Joaozin - AP 32º',
    'Visitante - Testao - AP 11º',
    'Serviços - Piazin - AP 03º',
  ];

  ngOnInit(): void {
  }

  onSubmitEntrada(){
    console.log(this.entradas)
    //console.log(this.EntrarForm.value['viewValueEntrada']+" - "+this.EntrarForm.value['nomeCompleto']+" -  AP "+this.EntrarForm.value['casa']+"º");
    this.entradas.push(this.EntrarForm.value['viewValueEntrada']+" - "+this.EntrarForm.value['nomeCompleto']+" -  AP "+this.EntrarForm.value['casa']+"º");
  }
  onSubmitSaida(){
    //console.log(this.SaidaForm.value['viewValueSaida']+" - "+this.SaidaForm.value['nomeCompleto']+" -  AP "+this.SaidaForm.value['casa']+"º");
    this.saidas.push(this.SaidaForm.value['viewValueSaida']+" - "+this.SaidaForm.value['nomeCompleto']+" -  AP "+this.SaidaForm.value['casa']+"º");
  }


  erro = "";
}
