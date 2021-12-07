import { Component,OnInit,OnDestroy } from '@angular/core';
import { ConexaoService } from 'src/app/service/conexao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DeletadoComponent } from 'src/app/avisos/deletado/deletado.component';
import { ErroComponent } from '../../avisos/erro/erro.component';
import { SalvoComponent } from '../../avisos/salvo/salvo.component';
import { ComunicadosConsulta } from 'src/app/service/conexao.model';
import { FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-comunicados',
  templateUrl: './comunicados.component.html',
  styleUrls: ['./comunicados.component.css']
})
export class ComunicadosComponent implements OnInit,OnDestroy {

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregando:boolean = false;

  private historico;
  public menu;
  public comunicados = new Array<ComunicadosConsulta>();
  public paginacaoComunicados;

  constructor(private conexao:ConexaoService,private snackBar: MatSnackBar,private formBuilder: FormBuilder){

  }

  CadastroForm = this.formBuilder.group({
    titulo: '',
    dados:''
  });

  ngOnInit(): void {
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.historico = this.conexao.getComunicados().subscribe(
      data => {
        const response = (data as any);
        this.comunicados = response;
        this.paginacaoComunicados = this.comunicados.slice(0,4);
      },
      error =>{
        this.ErroSnackBar();
      }
    );
  }

  ErroSnackBar() {
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  openSnackBarDeletado() {
    this.snackBar.openFromComponent(DeletadoComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  abrirFormulario(){
    this.menu=true;
  }

  fecharFormulario(){
    this.menu=false;
    this.CadastroForm.reset();
  }

  onSubmitCadastro(){
    this.carregando = true;
  
    //console.log(this.CadastroForm);
    this.conexao.cadastroComunicado(this.CadastroForm).then(()=>{
    this.openSnackBar();
    this.carregando = false;
    }).then(()=>{
      this.ionViewDidEnter();
    }).catch((res)=>{
    //console.log(res);
      this.ErroSnackBar();
      this.carregando = false;
    });
   
  }

  excluir(exclusao){
    // console.log(exclusao.id);
     let indice = this.comunicados.indexOf(exclusao);
     this.conexao.deletarComunicado(exclusao.id).then(()=>{
      while(indice>=0){
        this.comunicados.splice(indice,1);
        indice = this.comunicados.indexOf(exclusao);
      }
      this.reOrganizar();
      this.openSnackBarDeletado();
     }).catch(()=>{
       this.ErroSnackBar();
     });
    
   }

   reOrganizar(){
    this.paginacaoComunicados = this.paginacaoComunicados = this.comunicados.slice(0,4);
  }


   onPageChange(event:PageEvent){

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

      if( endIndex > this.comunicados.length){
        endIndex = this.comunicados.length;
      }
      this.paginacaoComunicados = this.comunicados.slice(startIndex, endIndex);
  }

  ngOnDestroy(){
    this.historico.unsubscribe();
  }
}
