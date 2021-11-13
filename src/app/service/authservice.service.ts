import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from './conexao.model';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
  })

export class AuthService { 
    
    private usuarioAutenticado:boolean = false;
    private usuarioAdm = false;

    mostrarMenuEmitter = new EventEmitter<boolean>();
    
    constructor(private route: Router){

    }

    login(form:Login){
      let formulario:Login = form;

      if(formulario.usuario==="18025946711" && formulario.senha==="25052000"){
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);
    

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
}