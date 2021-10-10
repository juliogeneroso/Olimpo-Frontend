import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { SalvoComponent } from '../../avisos/salvo/salvo.component';
import { ConexaoService } from '../../service/conexao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ResidentesItem } from '../../service/conexao.model';
import { AlteradoComponent } from '../../avisos/alterado/alterado.component';
import { Router } from '@angular/router';
import { ErroComponent } from '../../avisos/erro/erro.component';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private conexao:ConexaoService,private snackBar: MatSnackBar,private rota:ActivatedRoute,private router:Router) { }

  private id;
  public nome;
  public bloco;
  public num;
  public morador;
  public filtro;
  //public ramal;
  carregando:boolean = false;
  imagePath = "/assets/load.gif";

  public dadosResidentes:ResidentesItem;

  ngOnInit(): void {
    this.rota.params.subscribe(params => this.id = params['id']);
    this.ionViewDidEnter(this.id);
  }

  durationInSeconds = 5;

  AlterarForm = this.formBuilder.group({
    id: '',
    nome: '',
    bloco:'',
    num: ''
   // ramal: ''
  });

  openSnackBar() {
    this.snackBar.openFromComponent(AlteradoComponent, {
      duration: this.durationInSeconds * 500,
    });
  }
  erroSnackBar() {
    this.carregando = false;
    this.snackBar.openFromComponent(ErroComponent, {
      duration: this.durationInSeconds * 500,
    });
  }

  ionViewDidEnter(id:number){
    this.filtro = this.conexao.filtroID(id).subscribe(
      data => {
        const response = (data as any);
        this.morador = response;
        this.nome = this.morador[0].nome;
        this.bloco = this.morador[0].bloco;
        this.num = this.morador[0].num;
      }, erro => {
          console.log("deu errado aqui");
      } 
    )
  }

  onSubmitCadastro(){
    this.carregando = true;
    this.AlterarForm.value.bloco = this.AlterarForm.value.bloco.toUpperCase(); 
    this.AlterarForm.value.id = this.id;
    this.conexao.editar(this.AlterarForm.value,this.AlterarForm.value.id).then(()=>{
      this.AlterarForm.reset();
    }).then(()=>{
      this.carregando = false;
      this.openSnackBar();
    }).then(()=>{
      this.router.navigate([`/residentes`]);
    }).catch(()=>{
      this.erroSnackBar();
    });
  }
}
