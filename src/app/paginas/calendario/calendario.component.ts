import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletadoComponent } from 'src/app/avisos/deletado/deletado.component';
import { ErroComponent } from 'src/app/avisos/erro/erro.component';
import { JaCadastrado } from 'src/app/avisos/jaCadastrado/jaCadastrado.component';
import { SalvoComponent } from 'src/app/avisos/salvo/salvo.component';
import { DatasReservadasConsulta } from 'src/app/service/conexao.model';
import { ConexaoService } from 'src/app/service/conexao.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})

export class CalendarioComponent implements OnInit, OnDestroy {
 

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar) { } 

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregando:boolean = false;

  public datasReservadas = new Array<DatasReservadasConsulta>();
  public disponibilidade = false;
  private datas;

  public menu;

CadastroForm = this.formBuilder.group({
  id:'',
  nome:'',
  dia: '',
  mes: '',
  ano: '',
  duracao: '',
  quantPessoas: ''
})

 

  ngOnInit(): void {
    this.datasConsulta();
  }

  datasConsulta(){
    this.datas = this.conexao.getDatas().subscribe(
      data => {
        const response = (data as any);
        this.datasReservadas = response;
      },
      error =>{
        this.ErroSnackBar();
      }
    );

  }

  abrirFormulario(){
    this.menu=true;
  }

  fecharFormulario(){
    this.menu=false;
    this.CadastroForm.reset();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  ErroClienteCadastrado() {
    this.carregando = false;
    this.snackBar.openFromComponent(JaCadastrado, {
      duration: this.durationInSeconds * 500,
    });
  }

  ErroSnackBar() {
    this.carregando = false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  openSnackBarDeletado() {
    this.snackBar.openFromComponent(DeletadoComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  excluir(exclusao){
    // console.log(exclusao.id);
     let indice = this.datasReservadas.indexOf(exclusao);
     this.conexao.deletarReserva(exclusao.reservaid).then(()=>{
       while(indice>=0){
         this.datasReservadas.splice(indice,1);
         indice = this.datasReservadas.indexOf(exclusao);
       }
       this.openSnackBarDeletado();
     }).catch(()=>{
       this.ErroSnackBar();
     });
     
   }

  onSubmitCadastro(){
    this.carregando = true;
  
    //console.log(this.CadastroForm);
    this.conexao.CadastroDataReservada(this.CadastroForm).then(()=>{
    this.openSnackBar();
    this.carregando = false;
    }).then(()=>{
      this.datasConsulta();
    }).catch((res)=>{
      this.carregando = false;
    //console.log(res);
      this.ErroSnackBar();
    });

   }

  ngOnDestroy(){
    this.datas.unsubscribe();
  }
}
