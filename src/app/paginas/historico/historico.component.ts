import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, UnsubscriptionError } from 'rxjs';
import { ConexaoService } from '../../service/conexao.service';
import { ControleEntradaSaida, controleEntregasConcluidas, Entrega, EntregaPendenteCadastrada } from '../../service/conexao.model';


interface Tipo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit,OnDestroy {

 

  constructor(private conexaoService:ConexaoService) { }

  public controlePessoasEntrada = new Array<ControleEntradaSaida>();
  public controlePessoasSaida = new Array<ControleEntradaSaida>();
  public controleEntregasPendentes = new Array<EntregaPendenteCadastrada>();
  public controleEntregasConcluidas =  new Array<controleEntregasConcluidas>();
  
  private historico;

  tipos: Tipo[] = [
    {value: '0', viewValue: 'Entradas'},
    {value: '1', viewValue: 'Saidas'},
    {value: '2', viewValue: 'Entregas Pendentes'},
    {value: '3', viewValue: 'Entregas Realizadas'},
  ];

  selectedTipo = this.tipos[0].viewValue;


  ngOnInit(): void {
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){ 
     this.historico = this.conexaoService.getEntrada().subscribe(
      data => {
        const response = (data as any);
        this.controlePessoasEntrada = response;
      },
      error =>{
        console.log('ERROR');
      }
    );
  }

  selecionar(tipo){
    if(tipo==="Entradas"){
      this.historicoEntrada();
    }if(tipo==="Saidas"){
      this.historicoSaida();
    }if(tipo==="Entregas Pendentes"){
      this.entregasPendentes();
    }if(tipo==="Entregas Realizadas"){
      this.entregasRealizadas();
    }
  } 

  historicoEntrada(){
    this.controlePessoasEntrada=[];
    this.historico = this.conexaoService.getEntrada().subscribe(
      data => {
        const response = (data as any);
        this.controlePessoasEntrada = response;
      },
      error =>{
        console.log('ERROR');
      }
    );
  }
  historicoSaida(){
    this.controlePessoasSaida=[];
    this.historico = this.conexaoService.getSaida().subscribe(
      data => {
        const response = (data as any);
        this.controlePessoasSaida = response;
      },
      error =>{
        console.log('ERROR');
      }
    );
  }
  entregasPendentes(){
    this.controleEntregasPendentes=[];
    this.historico = this.conexaoService.getEntregasPendentes().subscribe(
      data => {
        const response = (data as any);
        this.controleEntregasPendentes = response;
      },
      error =>{
        console.log('ERROR');
      }
    );
  }
  entregasRealizadas(){
    this.controleEntregasConcluidas=[];
    this.historico = this.conexaoService.getEntregasConcluidas().subscribe(
      data => {
        const response = (data as any);
        this.controleEntregasConcluidas = response;
      },
      error =>{
        console.log('ERROR');
      }
    );
  }
  entregar(pendentes){
    
    let indice = this.controleEntregasPendentes.indexOf(pendentes);
    console.log(pendentes);
    //Remove a entrega no banco de dados. pendentes valores em um array: {viewValue:'',bloco:'',num:,obs:''} //lembrando que num é do tipo number
    this.conexaoService.entregasConcluidas(pendentes);
    
    //Remove o item da lista de Entregas Pendentes.
    while(indice>=0){
      this.controleEntregasPendentes.splice(indice,1);
      indice = this.controleEntregasPendentes.indexOf(pendentes);
    }
    
  }
  ngOnDestroy(){
    this.historico.unsubscribe();
  }
}
