import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, interval, Observable} from 'rxjs';
import { Cadastro, ComunicadosCadastro, ComunicadosConsulta, ControleEntradaSaida, ControleEntregasConcluidas, DatasReservadasCadastro, DatasReservadasConsulta, Entrega, EntregaPendenteCadastrada, ExibirLogin, Formulario, LoginDados, ResidentesItem } from './conexao.model';
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
    let caminho = `${this.baseUrl}/residentes`;
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

  getEntregasPendentes():Observable<EntregaPendenteCadastrada>{
    let caminho = `${this.baseUrl}/entregas/pendentes`;
    return this.http.get<EntregaPendenteCadastrada>(caminho);
  }

  getEntregasConcluidas():Observable<ControleEntregasConcluidas>{
    let caminho = `${this.baseUrl}/entregas/concluidas`;
    return this.http.get<ControleEntregasConcluidas>(caminho);
  }

  filtroID(form):Observable<ResidentesItem>{
    let id = form.value.id;
    let caminho = `${this.baseUrl}/residentes/filtro/id/${id}`;
    return this.http.get<ResidentesItem>(caminho);
  }

  filtroID2(id:number):Observable<ResidentesItem>{
    let caminho = `${this.baseUrl}/residentes/filtro/id/${id}`;
    return this.http.get<ResidentesItem>(caminho);
  }

  getEntradaTemp():Observable<Formulario>{
    let caminho = `${this.baseUrl}/temporaria/entrada`;
    return this.http.get<Formulario>(caminho);
  }

  getPorteirosCadastrados():Observable<ExibirLogin>{
    let caminho = `${this.baseUrl}/porteiros`;
    return this.http.get<ExibirLogin>(caminho);
  }

  getComunicados():Observable<ComunicadosConsulta>{
    let caminho = `${this.baseUrl}/exibir/noticias`;
    return this.http.get<ComunicadosConsulta>(caminho);
  }

  getDatas():Observable<DatasReservadasConsulta>{
    let caminho = `${this.baseUrl}/exibir/datas`;
    return this.http.get<DatasReservadasConsulta>(caminho);
  }

  verificarDisponibilidade(form):Observable<DatasReservadasConsulta>{
    let consulta:DatasReservadasCadastro = form.value; 
    let caminho = `${this.baseUrl}/consultar/data/${consulta.dia}/${consulta.mes}/${consulta.ano}`;
    return this.http.get<DatasReservadasConsulta>(caminho);
  }
  //////////////////////////////////////

  consultaEntradaBlocoNum(form):Observable<ControleEntradaSaida>{
    let dados = form.value;
    let caminho = `${this.baseUrl}/entrada/${(dados.bloco).toUpperCase()}/${dados.num}`;
    return this.http.get<ControleEntradaSaida>(caminho);
  }

  consultaSaidaBlocoNum(form):Observable<ControleEntradaSaida>{
    let dados = form.value;
    let caminho = `${this.baseUrl}/saida/${(dados.bloco).toUpperCase()}/${dados.num}`;
    return this.http.get<ControleEntradaSaida>(caminho);
  }

  consultaEntregasPendentes(form):Observable<EntregaPendenteCadastrada>{
    let dados = form.value;
    let caminho = `${this.baseUrl}/pendentes/${(dados.bloco).toUpperCase()}/${dados.num}`;
    return this.http.get<EntregaPendenteCadastrada>(caminho);
  }

  consultaEntregasConcluidas(form):Observable<ControleEntregasConcluidas>{
    let dados = form.value;

    let caminho = `${this.baseUrl}/concluidas/${(dados.bloco).toUpperCase()}/${dados.num}`;
    return this.http.get<ControleEntregasConcluidas>(caminho);
  }
  //////////////////////////////////////////////
  async cadastro(form){
    let formulario:Formulario = form.value;
    let caminho = `${this.baseUrl}/cadastro/residente`;
    let resposta;

    //console.log(formulario);
    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return erro;
    });
    if(resposta.status === "203"){
      return Promise.reject(resposta);
    }
    //inserir tratamento de erro aqui;
    return resposta;
  }

  async cadastroPorteiro(form){
    let formulario:LoginDados = form.value;
    let caminho = `${this.baseUrl}/cadastrar/porteiro`;
    let resposta;

    //console.log(formulario);
    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return erro;
    });
    if(resposta.status === "203"){
      return Promise.reject(resposta);
    }
    //inserir tratamento de erro aqui;
    return resposta;
  }

  async entrada(form){
    let formulario:Formulario = form;
    let caminho = `${this.baseUrl}/registro/entrada`;
    let resposta;

    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //inserir tratamento de erro aqui;
    console.log(resposta);
    return resposta;
  }

  async entradaTemporaria(form){
    let formulario:Formulario = form;
    let caminho = `${this.baseUrl}/registro/entradas/temporarias`;
    let resposta;

    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //inserir tratamento de erro aqui;
    console.log(resposta);
    return resposta;
  }

  async tempSaida(form){
    let formulario:Formulario = form;
    let caminho = `${this.baseUrl}/registro/entradas/temporarias/sair`;
    let resposta;

    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    console.log(resposta);
    //Inserir tratamento de erro aqui
    return resposta;
  }
  
  async saida(form){
    let formulario:Formulario = form;
    let caminho = `${this.baseUrl}/registro/saida`;
    let resposta;

    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //inserir tratamento de erro aqui;
    return resposta;
  }


  async entregasPendentes(entrega){
    let entregas:Entrega = entrega.value;
    let caminho = `${this.baseUrl}/registro/entregas/pendentes`;
    let resposta;
    
    await this.http.post(caminho,JSON.stringify(entregas),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //Inserer tratamento de erro aqui.
    return resposta;
  }

  async entregasConcluidas(entrega){
    let entregas:Entrega = entrega;
    let caminho = `${this.baseUrl}/registro/entregas/concluidas`;
    let resposta;

    //console.log(entrega);

    await this.http.post(caminho,JSON.stringify(entregas),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //console.log(resposta);
    //Inserer tratamento de erro aqui.
    return resposta;
  }

  async cadastroComunicado(comunicado){
    let comunicados:ComunicadosCadastro = comunicado.value;
    console.log(comunicados);
    let caminho = `${this.baseUrl}/cadastrar/noticias`;
    let resposta;

    //console.log(entrega);

    await this.http.post(caminho,JSON.stringify(comunicados),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //console.log(resposta);
    //Inserer tratamento de erro aqui.
    return resposta;
  }

  async CadastroDataReservada(form){
    let formulario:DatasReservadasCadastro = form.value;
    let caminho = `${this.baseUrl}/agendar`;
    let resposta;

    await this.http.post(caminho,JSON.stringify(formulario),this.httpOptions).toPromise()
    .then(data => {
      resposta = data
    })
    .catch(erro => {
      return Promise.reject();
    });
    //inserir tratamento de erro aqui;
    console.log(resposta);
    return resposta;
  }

  async deletarResidente(id:number){
    //console.log(id);
    let caminho = `${this.baseUrl}/deletar/morador/${id}`;
    let resposta;

    await this.http.delete(caminho).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    console.log(resposta);
    //Inserir tratamento de erro aqui
    return resposta;
  }

  async deletarPorteiro(id:number){
    //console.log(id);
    let caminho = `${this.baseUrl}/deletar/porteiro/${id}`;
    let resposta;

    await this.http.delete(caminho).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    console.log(resposta);
    //Inserir tratamento de erro aqui
    return resposta;
  }
  
  async deletarReserva(id:number){
    let caminho = `${this.baseUrl}/deletar/reserva/${id}`;
    let resposta;

    await this.http.delete(caminho).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    console.log(resposta);
    //Inserir tratamento de erro aqui
    return resposta;
  }

  async deletarComunicado(id:number){
    //console.log(id);
    let caminho = `${this.baseUrl}/deletar/noticia/${id}`;
    let resposta;

    await this.http.delete(caminho).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    console.log(resposta);
    //Inserir tratamento de erro aqui
    return resposta;
  }

  async editar(editar, id:number){
    let mudanca:ResidentesItem = editar;
    let caminho = `${this.baseUrl}/alterar/morador/${id}`;
    let resposta;

    await this.http.patch<ResidentesItem>(caminho,JSON.stringify(mudanca),this.httpOptions).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    return resposta;
  }

  async editarReserva(editar, id:number){
    let mudanca:DatasReservadasConsulta = editar;
    let caminho = `${this.baseUrl}/editar/noticia/${id}`;
    let resposta;

    await this.http.patch<DatasReservadasConsulta>(caminho,JSON.stringify(mudanca),this.httpOptions).toPromise()
    .then(data => {
      resposta = data;
    })
    .catch(erro => {
      return Promise.reject();
    })
    return resposta;
  }
  
}


//app.post('/registro/entregas/concluidas')
//app.post('/registro/entregas/pendentes')

//app.post('/registro/entradas/temporarias/sair')
///app.post('registro/entradas/temporarias')
//app.post('/registro/entrada') -- ok 
//app.post('/registro/saida') -- ok

//app.get("temporaria/entrada")
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
