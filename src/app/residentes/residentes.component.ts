import {  Component, OnInit, OnDestroy } from '@angular/core';
import { ResidentesItem } from '../service/conexao.model';
import { ConexaoService } from '../service/conexao.service';


@Component({
  selector: 'app-residentes',
  templateUrl: './residentes.component.html',
  styleUrls: ['./residentes.component.css']
})
export class ResidentesComponent implements OnInit,OnDestroy {
 
  constructor(private conexao:ConexaoService){}

  private historico;
  public moradores = new Array<ResidentesItem>();

  ngOnInit() {
    this.ionViewDidEnter();
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
