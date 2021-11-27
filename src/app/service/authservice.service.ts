import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './conexao.model';
import { Router } from '@angular/router';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';
import { ThisReceiver } from '@angular/compiler';
import { from } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

export class AuthService { 
    
    private usuarioAutenticado:boolean = false;
    private usuarioAdm = false;

    mostrarMenuEmitter = new EventEmitter<boolean>();
    erroEmitter = new EventEmitter<boolean>();
    rotaAdmEmitter = new EventEmitter<boolean>();

    private baseUrl = 'http://localhost:8000';
    
    constructor(private route: Router,private http:HttpClient){

    }

    private headers = new HttpHeaders({
      "Content-Type":  "application/json",
      "Accept": "application/json"
    });
    private httpOptions = {
      headers: this.headers
    };


    async login(form:Login){
      //console.log(form.id)
      let caminho = `${this.baseUrl}/entrar`;
      let resposta;

      await this.http.post(caminho,JSON.stringify(form),this.httpOptions).toPromise()
      .then(data => {
        resposta = data
      })
      .catch(erro => {
        this.erroEmitter.emit(true);
      });

      if(resposta){
        
        //sessionStorage.setItem('id',resposta.detalhe[0].id);
        //sessionStorage.setItem('senha',resposta.detalhe[0].senha);
        //sessionStorage.setItem('admin',resposta.detalhe[0].admin);

        this.usuarioAutenticado = true;
        
        this.mostrarMenuEmitter.emit(true);
        
        if(resposta.detalhe[0].admin){
          this.usuarioAdm = true;
          this.rotaAdmEmitter.emit(true);
        }

        this.route.navigate(['/']);
      } else {
        this.mostrarMenuEmitter.emit(false);

        this.usuarioAutenticado = false;
      }
    }

    usuarioEstaAutenticado(){
      return this.usuarioAutenticado;
    }
    usuarioAdministrador(){
      return this.usuarioAdm;
    }

    sair(){
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
      this.usuarioAdm = false;
      this.route.navigate(['/']);
    }
}