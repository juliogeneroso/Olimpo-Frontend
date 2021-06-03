import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { interval, Observable, throwError  } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { catchError, retry } from 'rxjs/operators';
import { ControleEntradaSaida, controleEntregasConcluidas, Entrega, Formulario } from './conexao.model';

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

 

  private baseUrl = 'http://localhost:8000';
  
  constructor(private http:HttpClient) { }


  private headers = new HttpHeaders({
    "Content-Type":  "application/json",
    "Accept": "application/json"
  });
  private httpOptions = {
    headers: this.headers
  };

  getEntrada():Observable<ControleEntradaSaida>{
    let caminho = `${this.baseUrl}/entrada`;
    return this.http.get<ControleEntradaSaida>(caminho);
  }

  getSaida():Observable<ControleEntradaSaida>{
    let caminho = `${this.baseUrl}/saida`;
    return this.http.get<ControleEntradaSaida>(caminho);
  }

  getEntregasPendentes():Observable<Entrega>{
    let caminho = `${this.baseUrl}/entregas/pendentes`;
    return this.http.get<Entrega>(caminho);
  }
  getEntregasConcluidas():Observable<controleEntregasConcluidas>{
    let caminho = `${this.baseUrl}/entregas/concluidas`;
    return this.http.get<controleEntregasConcluidas>(caminho);
  }

  entrada(form):Promise<Formulario>{
    let formulario:Formulario = form.value;
    //console.log(JSON.stringify(formulario));
    let caminho = `${this.baseUrl}/registro/entrada`;
    //console.log(caminho,JSON.stringify(formulario),this.httpOptions);
    return this.http.post<Formulario>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao registrar entrada ` + erro);
    });
  }
  saida(form):Promise<Formulario>{
    let formulario:Formulario = form.value;
    //console.log(JSON.stringify(formulario));
    let caminho = `${this.baseUrl}/registro/saida`;
    //console.log(caminho,JSON.stringify(formulario),this.httpOptions);
    return this.http.post<Formulario>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao registrar saida ` + erro);
    });
  }

  //A ação abaixo registra os dados de entregas pendentes na tabela entregas_pendentes
  //Utilização com Promise, pois o servidor ignora o Observable
  // Model Entrega => viewValue: string; bloco: string; num: number; obs:string;

  entregasPendentes(entrega):Promise<Entrega>{
    let entregas:Entrega = entrega.value;
    //caminho padrão baseURl: http://localhost:8000
    let caminho = `${this.baseUrl}/registro/entregas/pendentes`;
    //O post do server está aceitando somente passagem de parâmetros via JSON. Modelo de arquivo: {"viewValue":"Mercadorias","bloco":"A","num":123,"obs":""}
    //this.httpOptions representa a regra de conexão de passagem de dados, sendo definido como Json
    return this.http.post<Entrega>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao registrar nova entrega `+erro); 
    });
  }
  //A ação abaixo registra na Tabela entregas_concluidas e retira dados da tabela entregas_pendentes. 
  //Utilização com Promise, pois o servidor ignora o Observable

  entregasConcluidas(entrega):Promise<Entrega>{
    //Não utilizo entrega.value pois já vem como Array e não objeto
    let entregas:Entrega = entrega;
    //caminho padrão baseURl: http://localhost:8000
    let caminho = `${this.baseUrl}/registro/entregas/concluidas`;
    //O post do server está aceitando somente passagem de parâmetros via JSON. Modelo de arquivo: {"viewValue":"Mercadorias","bloco":"A","num":123,"obs":""}
    //this.httpOptions representa a regra de conexão de passagem de dados, sendo definido como Json
    return this.http.post<Entrega>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao registrar nova entrega `+erro); 
    });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log("handleError"+errorMessage);
    return throwError(errorMessage);
  };
}
