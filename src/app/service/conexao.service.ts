import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { interval, Observable} from 'rxjs';
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
  
  getMoradores():Observable<ResidentesItem>{
    let caminho = `${this.baseUrl}/moradores`;
    return this.http.get<ResidentesItem>(caminho);
  }

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

  async cadastro(form):Promise<Cadastro>{
    let formulario:Formulario = form.value;
    let caminho = `${this.baseUrl}/cadastro/residente`;
    let resposta;

    await this.http.post<Cadastro>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().then(data => {resposta = data});
    //inserir tratamento de erro aqui;
    return resposta;
  }

  async entrada(form):Promise<Formulario>{
    let formulario:Formulario = form.value;
    let caminho = `${this.baseUrl}/registro/entrada`;
    let resposta;

    await this.http.post<Formulario>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().then(data => {resposta = data});
    //inserir tratamento de erro aqui;
    return resposta;
  }
  
  async saida(form):Promise<Formulario>{
    let formulario:Formulario = form.value;
    let caminho = `${this.baseUrl}/registro/saida`;
    let resposta;

    await this.http.post<Formulario>(caminho,JSON.stringify(formulario),this.httpOptions).toPromise().then(data => {resposta = data});
    //inserir tratamento de erro aqui;
    return resposta;
  }


  async entregasPendentes(entrega):Promise<Entrega>{
    let entregas:Entrega = entrega.value;
    let caminho = `${this.baseUrl}/registro/entregas/pendentes`;
    let resposta;
    
    await this.http.post<Entrega>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise().then(data => {resposta = data}); 
    //Inserer tratamento de erro aqui.
    return resposta;
  }

  async entregasConcluidas(entrega):Promise<Entrega>{
    let entregas:Entrega = entrega;
    let caminho = `${this.baseUrl}/registro/entregas/concluidas`;
    let resposta;

    await this.http.post<Entrega>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise().then(data => {resposta = data}); 
    //Inserer tratamento de erro aqui.
    return resposta;
  }

  deletarResidente(excluir:ResidentesItem):Promise<ResidentesItem>{
    let entregas:ResidentesItem = excluir;
    console.log(entregas);
    let caminho = `${this.baseUrl}/excluir`;
    return this.http.post<ResidentesItem>(caminho,JSON.stringify(entregas),this.httpOptions).toPromise()
  }
  editar(editar):Promise<ResidentesItem>{
    let mudanca:ResidentesItem = editar;
    console.log(mudanca);
    let caminho = `${this.baseUrl}/alterar`;
    return this.http.post<ResidentesItem>(caminho,JSON.stringify(mudanca),this.httpOptions).toPromise()
  }
}


//app.post('/registro/entregas/concluidas')
//app.post('/registro/entregas/pendentes')

//app.post('/registro/entrada') -- ok 
//app.post('/registro/saida') -- ok

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
