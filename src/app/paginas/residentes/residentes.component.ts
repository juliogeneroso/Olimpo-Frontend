import {  Component, OnInit, OnDestroy } from '@angular/core';
import { Cadastro, ResidentesItem } from '../../service/conexao.model';
import { ConexaoService } from '../../service/conexao.service';
import { DeletadoComponent } from '../../avisos/deletado/deletado.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlteradoComponent } from '../../avisos/alterado/alterado.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css']
})
export class ResidentesComponent implements OnInit,OnDestroy {
 

  constructor(private conexao:ConexaoService, private snackBar:MatSnackBar,private router:Router){}

  
  panelOpenState = false;
  private historico;
  public input:boolean;
  public moradores = new Array<ResidentesItem>();
  durationInSeconds = 5;

  ngOnInit() {
    this.ionViewDidEnter();
  }

  openSnackBarDeletado() {
    this.snackBar.openFromComponent(DeletadoComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackBarAlterado() {
    this.snackBar.openFromComponent(AlteradoComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  alterar(alterar:ResidentesItem){
    let id = alterar.id;
    let nome = alterar.nome;
    let bloco = alterar.bloco
    let casa = alterar.num;
    let ramal = alterar.ramal;

    this.router.navigate([`/alterar`, id, nome, bloco, casa, ramal]);
  }
  excluir(exclusao){
    let indice = this.moradores.indexOf(exclusao);
    this.conexao.deletarResidente(exclusao);
    while(indice>=0){
      this.moradores.splice(indice,1);
      indice = this.moradores.indexOf(exclusao);
    }
    this.openSnackBarDeletado();
  }

  ionViewDidEnter(){
    this.historico = this.conexao.getMoradores().subscribe(
      data => {
        const response = (data as any);
        this.moradores = response;
      }, err => {
          console.log("deu errado aqui");
      } 
    )
  }

  ngOnDestroy(){
    this.historico.unsubscribe();
  }
}
