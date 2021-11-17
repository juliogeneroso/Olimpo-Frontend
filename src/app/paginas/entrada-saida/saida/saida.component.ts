import { Component,OnInit,AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../../../service/conexao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvoComponent } from '../../../avisos/salvo/salvo.component';
import { ErroComponent } from '../../../avisos/erro/erro.component';
import { VoiceRecognitionService } from '../../../service/voice.service';
import { TempService } from 'src/app/service/temp.service';



interface Tipo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css'],
  providers:[VoiceRecognitionService,TempService]
})

export class SaidaComponent implements OnInit,AfterViewInit {

  public saidas = new Array();
  public ultimaSaida = new Array();

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar,public voiceService:VoiceRecognitionService,public temp:TempService){ 
    this.voiceService.init();
    this.saidas = [];
    this.ultimaSaida = [];
  }

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregandoEntrada:boolean = false;
  carregandoSaida:boolean = false;

  public microfone:boolean = false;
  
  //Saída 
  SaidaForm = this.formBuilder.group({
    tipo: '',
    nome: '',
    bloco:'', 
    num: '',
  });
  /*controle saida----ok */
  tiposSaida: Tipo[] = [
    {value: '0', viewValue: 'Residente'},
    {value: '1', viewValue: 'Serviços'},
    {value: '2', viewValue: 'Visitante'}
  ];
  selectedTipoSaida = this.tiposSaida[0].viewValue;
  //Fim Saída
  
 

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    TempService.novaSaida.subscribe(incluir => {
    console.log(incluir);
     this.saidas.push(incluir.tipo+" ( "+"Bloco "+incluir.bloco.toUpperCase()+" AP "+incluir.num+"º"+" ) - "+incluir.nome)
     this.ultimaSaida = this.saidas.slice().reverse().slice(0,4);
    });
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  erroSnackBarSaida() {
    this.carregandoSaida=false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  limparCampoSaida(){
    this.SaidaForm.reset();  
  }

   startService(){
    if(this.voiceService.microfone){
      this.stopService();
    } else {
      this.voiceService.start();
    }
  }

  stopService(){
    this.voiceService.stop()
  }
  
  onSubmitSaida(){
    this.carregandoSaida = true;
    this.SaidaForm.value.bloco = this.SaidaForm.value.bloco.toUpperCase(); 
    this.conexao.saida(this.SaidaForm.value)
    .then(() => {
    this.saidas.push(this.SaidaForm.value['tipo']+" ( "+"Bloco "+this.SaidaForm.value['bloco'].toUpperCase()+" AP "+this.SaidaForm.value['num']+"º"+" ) - "+this.SaidaForm.value['nome']);
    console.log(this.saidas);
    this.ultimaSaida = this.saidas.slice().reverse().slice(0,4);
    })
    .then(() => {
    this.openSnackBar();
    this.carregandoSaida=false;
    })
    .then(()=>{
      this.SaidaForm.reset();
    })
    .catch(() => {
    this.erroSnackBarSaida()});;
  } 
}
