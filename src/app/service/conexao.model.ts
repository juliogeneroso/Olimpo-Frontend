export interface Formulario{
    tipo: string;
    nome: string;
    bloco: string;
    num: number;
}
export interface Entrega{
    viewValue: string;
    bloco: string;
    num: number;
    obs:string;
}
export interface EntregaPendenteCadastrada{
    id: number;
    viewValue: string;
    bloco: string;
    num: number;
    obs:string;
}
export interface ControleEntradaSaida{
    nome: string;
    tipo: string;
    bloco: string;
    num: number;
    hora: string;
    dia: string;
}
export interface controleEntregasConcluidas{
    tipo: string;
    bloco: string;
    num: number;
    obs: string;
    hora: string;
    dia: string;
}
export interface ResidentesItem {
    id: number;
    nome: string;
    ramal:string;
    bloco: string;
    num: string;
  }
export interface Cadastro{
    nome: string;
    bloco: string;
    num: string;
    //ramal: string;
}
export interface Login{
    usuario: string;
    senha: string;
}