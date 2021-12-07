import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../../service/conexao.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { ErroComponent } from '../../avisos/erro/erro.component';
import { SalvoComponent } from '../../avisos/salvo/salvo.component';
import { JaCadastrado } from 'src/app/avisos/jaCadastrado/jaCadastrado.component';
import { ExibirLogin } from 'src/app/service/conexao.model';
import { DeletadoComponent } from 'src/app/avisos/deletado/deletado.component';

@Component({
  selector: 'app-cadastro-porteiro',
  templateUrl: './cadastro-porteiro.component.html',
  styleUrls: ['./cadastro-porteiro.component.css']
})
export class CadastroPorteiroComponent implements OnInit,OnDestroy {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar) { }

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregando:boolean = false;

  public porteirosCadastrados = new Array<ExibirLogin>();
  private cadastros;

  CadastroForm = this.formBuilder.group({
    id: '',
    nome:'',
    senha: ''
  });


  ngOnInit(): void {
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){
    this.cadastros = this.conexao.getPorteirosCadastrados().subscribe(
      data => {
        const response = (data as any);
        this.porteirosCadastrados = response;
      },
      error =>{
        this.ErroSnackBar();
      }
    );
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
     let indice = this.porteirosCadastrados.indexOf(exclusao);
     this.conexao.deletarPorteiro(exclusao.id).then(()=>{
      while(indice>=0){
        this.porteirosCadastrados.splice(indice,1);
        indice = this.porteirosCadastrados.indexOf(exclusao);
      }
      this.openSnackBarDeletado();
     }).catch(()=>{
       this.ErroSnackBar();
     });
    
   }

  onSubmitCadastro(){
    this.carregando = true;
  
    //console.log(this.CadastroForm);
    this.conexao.cadastroPorteiro(this.CadastroForm).then(()=>{
    this.openSnackBar();
    this.carregando = false;
    }).then(()=>{
      this.ionViewDidEnter();
    }).catch((res)=>{
      this.carregando = false;
    //console.log(res);
    if(res.status == "203"){
      this.ErroClienteCadastrado();
    }else{
      this.ErroSnackBar();
    }
    });
   
  }

  ngOnDestroy(){
    this.cadastros.unsubscribe();
  }
}



  