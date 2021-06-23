import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalvoComponent } from '../avisos/salvo/salvo.component';
import { ConexaoService } from '../service/conexao.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar) { }

  durationInSeconds = 5;

  ngOnInit(): void {
  }

  CadastroForm = this.formBuilder.group({
    nomeCompleto: '',
    bloco:'',
    casa: '',
    ramal: ''
  });

  openSnackBar() {
    this.snackBar.openFromComponent(SalvoComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  onSubmitCadastro(){
    this.CadastroForm.value.bloco = this.CadastroForm.value.bloco.toUpperCase(); 
    this.conexao.cadastro(this.CadastroForm);
    this.openSnackBar();
    this.CadastroForm.reset();
  }
}
