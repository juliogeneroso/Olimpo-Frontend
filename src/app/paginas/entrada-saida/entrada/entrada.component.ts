import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../../../service/conexao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvoComponent } from '../../../avisos/salvo/salvo.component';
import { ErroComponent } from '../../../avisos/erro/erro.component';
import { VoiceRecognitionService } from '../../../service/voice.service';
import { TempService } from 'src/app/service/temp.service';
import { Formulario } from 'src/app/service/conexao.model';


interface Tipo {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css'],
  providers:[VoiceRecognitionService,TempService]
})
export class EntradaComponent implements OnInit {

  public botaoMicrofone: boolean = true;

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar,public voiceService:VoiceRecognitionService, public temp: TempService){ 
    this.voiceService.init()
    this.botaoMicrofone = true;
  }

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregandoEntrada:boolean = false;
  carregandoSaida:boolean = false;
  

  public microfone:boolean = false;

  //Entrada
  EntrarForm = this.formBuilder.group({
    tipo: '',
    nome: '',
    bloco:'',
    num: '',
  });
  
  //controle de entrada --- ok 
  tiposEntrada: Tipo[] = [
    {value: '0', viewValue: 'Residente'},
    {value: '1', viewValue: 'Serviços'},
    {value: '2', viewValue: 'Visitante'}
  ];
  selectedTipoEntrada = this.tiposEntrada[0].viewValue; 
  //Fim Entrada

  entradas = [];
  ultimaEntrada = [];

  ngOnInit(): void {
    if (!navigator.onLine) {
    this.botaoMicrofone = false;
    }
  }
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
  
  limparCampoEntrada(){
    this.EntrarForm.reset();  
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
  
   onSubmitEntrada(){
      this.carregandoEntrada = true;
      this.EntrarForm.value.bloco = this.EntrarForm.value.bloco.toUpperCase(); 
      this.conexao.entrada(this.EntrarForm.value)
      .then(() => {
      this.entradas.push(this.EntrarForm.value['tipo']+" ( "+"Bloco "+this.EntrarForm.value['bloco'].toUpperCase()+" AP "+this.EntrarForm.value['num']+"º"+" ) - "+this.EntrarForm.value['nome']);
      this.ultimaEntrada = this.entradas.slice().reverse().slice(0,4);
      }).then(() => {
        if(this.EntrarForm.value['tipo']=="Serviços"){
          let v :Formulario = this.EntrarForm.value;
          this.conexao.entradaTemporaria(v).then(()=>{
            this.temp.entrada(v);
          }).catch(()=>{
            this.erroSnackBarEntrada();
          });
        }
      })
      .then(() => {
      this.openSnackBar();
      this.carregandoEntrada=false
      })
      .then(()=>{
          //this.EntrarForm.reset();
      })
      .catch(() => {
      this.erroSnackBarEntrada()});
  }
}
