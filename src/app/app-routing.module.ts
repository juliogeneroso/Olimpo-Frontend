import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunicadosComponent } from './comunicados/comunicados.component';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { EntregasComponent } from './entregas/entregas.component';
import { HistoricoComponent } from './historico/historico.component';
import { ResidentesComponent } from './residentes/residentes.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AlterarComponent } from './alterar/alterar.component';


const routes:Routes = [
  {path:'entrada_saida',component:EntradaSaidaComponent},
  {path:'historico',component:HistoricoComponent},
  {path:'entregas',component: EntregasComponent },
  {path:'residentes',component:ResidentesComponent},
  {path:'cadastro',component:CadastroComponent},
  {path:'comunicados',component:ComunicadosComponent},
  {path: 'alterar/:id/:nome/:bloco/:casa/:ramal', component: AlterarComponent},
  {path:'',component:EntradaSaidaComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
