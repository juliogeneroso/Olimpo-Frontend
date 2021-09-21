export class Formulario{
    tipo: string;
    nome: string;
    bloco: string;
    num: number;
}
export class Entrega{
    viewValue: string;
    bloco: string;
    num: number;
    obs:string;
}
export class ControleEntradaSaida{
    nome: string;
    tipo: string;
    bloco: string;
    num: number;
    hora: string;
    dia: string;
}
export class controleEntregasConcluidas{
    tipo: string;
    bloco: string;
    num: number;
    obs: string;
    hora: string;
    dia: string;
}
export class ResidentesItem {
    id: number;
    nome: string;
    ramal:string;
    bloco: string;
    num: string;
  }
export class Cadastro{
    nomeCompleto: string;
    bloco: string;
    casa: string;
    ramal: string;
}