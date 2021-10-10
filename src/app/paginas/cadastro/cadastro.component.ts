import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../../service/conexao.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ErroComponent } from '../../avisos/erro/erro.component';
import { SalvoComponent } from '../../avisos/salvo/salvo.component';
import { JaCadastrado } from 'src/app/avisos/jaCadastrado/jaCadastrado.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar) { }

  durationInSeconds = 5;
  imagePath = "/assets/load.gif";
  carregando:boolean = false;


  ngOnInit(): void {
  }

  CadastroForm = this.formBuilder.group({
    nome: '',
    bloco:'',
    num: ''
    //ramal: ''
  });

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

  onSubmitCadastro(){
    this.carregando = true;
    this.CadastroForm.value.bloco = this.CadastroForm.value.bloco.toUpperCase(); 

    //console.log(this.CadastroForm);
    this.conexao.cadastro(this.CadastroForm).then(()=>{
    this.openSnackBar();
    this.carregando = false;
   // })//.then(()=>{
   // this.CadastroForm.reset();
    }).catch((res)=>{
    //console.log(res);
    if(res.status == "203"){
      this.ErroClienteCadastrado();
    }else{
      this.ErroSnackBar();
    }
    });
   
   
  }
}
