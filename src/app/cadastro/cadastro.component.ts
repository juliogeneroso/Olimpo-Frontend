import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ConexaoService } from '../service/conexao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService) { }

  ngOnInit(): void {
  }

  CadastroForm = this.formBuilder.group({
    nomeCompleto: '',
    bloco:'',
    casa: '',
  });

  onSubmitCadastro(){
    this.CadastroForm.value.bloco = this.CadastroForm.value.bloco.toUpperCase(); 
    
  }

}
