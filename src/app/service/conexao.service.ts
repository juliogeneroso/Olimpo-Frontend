import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { interval, Observable, ObservedValueOf, throwError  } from 'rxjs';
import { Cadastro, ControleEntradaSaida, controleEntregasConcluidas, Entrega, Formulario, ResidentesItem } from './conexao.model';
;

@Injectable({
  providedIn: 'root'
})
export class ConexaoService {

 

  private baseUrl = 'http://localhost:8000';
  
  constructor(private http:HttpClient) { }

  //Condição para passagem de dados via json para o Node.
  private headers = new HttpHeaders({
    "Content-Type":  "application/json",
    "Accept": "application/json"
  });
  private httpOptions = {
    headers: this.headers
  };
  
  //Pega a lista de todos moradores, é retornado o array de obejtos JSON. Contendo informações de: 
  getMoradores():Observable<ResidentesItem>{
    let caminho = `${this.baseUrl}/moradores`;
    return this.http.get<ResidentesItem>(caminho);
  }
  //Pega o registro de entradas total já realizados, é retornado o array de objetos JSON. Contendo informações de Nome,Tipo,Bloco,Num,Data e hora
  getEntrada():Observable<ControleEntradaSaida>{
    let caminho = `${this.baseUrl}/entrada`;
    return this.http.get<ControleEntradaSaida>(caminho);
  }

  //Pega o registro de saidas total já realizados, é retornado o array de objetos JSON. Contendo informações de Nome,Tipo,Bloco,Num,Data e hora
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

  cadastro(form):Promise<Cadastro>{
    let formulario:Formulario = form.value;
    let caminho = `${this.baseUrl}/cadastro`;
    return this.http.post<Cadastro>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao registrar entrada ` + erro);
    });
  }

  entrada(form):Promise<Formulario>{
    let formulario:Formulario = form.value;
    console.log(JSON.stringify(formulario));
    let caminho = `${this.baseUrl}/registro/entrada`;
    //console.log(caminho,JSON.stringify(formulario),this.httpOptions);
    return this.http.post<Formulario>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().catch(erro=>{
      console.log("deu erro aqui");
      console.log(erro);
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
  //
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

  deletarResidente(excluir:ResidentesItem):Promise<ResidentesItem>{
    let entregas:ResidentesItem = excluir;
    console.log(entregas);
    let caminho = `${this.baseUrl}/excluir`;
    return this.http.post<ResidentesItem>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao excluir `+erro); 
    });
  }
  editar(editar):Promise<ResidentesItem>{
    let mudanca:ResidentesItem = editar;
    console.log(mudanca);
    let caminho = `${this.baseUrl}/alterar`;
    return this.http.post<ResidentesItem>(caminho,JSON.stringify(mudanca),this.httpOptions).toPromise().catch(erro=>{
      return Promise.reject(`Erro ao excluir `+erro); 
    });
  }
  //HandleError permite leitura do erro em outras funções
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do cliente
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    //console.log("handleError"+errorMessage);
    return throwError(errorMessage);
  };
}


//app.post('/registro/entregas/concluidas')
//app.post('/registro/entregas/pendentes')

//app.post('/registro/entrada')
//app.post('/registro/saida')

//app.get("/entrada")
//app.get("/saida")
//app.get("/entrada/:tipo/:bloco/:num")
//app.get("/entrada/:tipo/:bloco")
//app.get("/entrada/:tipo")
//app.get("/saida/:tipo/:bloco/:num")
//app.get("/saida/:tipo/:bloco"
//app.get("/saida/:tipo")

//app.get("/entregas/concluidas")
//app.get("/entregas/pendentes")
//app.get("/entregas/pendentes/:viewValue/:bloco/:num")
//app.get("/entregas/pendentes/:viewValue/:bloco")
//app.get("/entregas/pendentes/:viewValue")
//app.get("/entregas/concluidas/:viewValue/:bloco/:num")
//app.get("/entregas/concluidas/:viewValue/:bloco")
//app.get("/entregas/concluidas/:viewValue")

//app.patch('/alterar/morador/:id')
//app.post('/cadastro/residente')
//app.delete('/deletar/morador/:id')

//app.get("/residentes")
//app.get("/residentes/filtro/id/:id")
//app.get("/residentes/filtro/nome/:nome)
//app.get("/residentes/filtro/bloco/:bloco)
//app.get("/residentes/filtro/num/:num)

//app.get('/exibir/noticias')
//app.get('/buscar/noticia/:id')
//app.post('/cadastrar/noticia')
//app.patch('/editar/noticia/:id')
//app.delete('/deletar/noticia/:id')
