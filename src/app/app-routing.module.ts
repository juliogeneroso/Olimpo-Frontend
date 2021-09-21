import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunicadosComponent } from './paginas/comunicados/comunicados.component';
import { EntradaSaidaComponent } from './paginas/entrada-saida/entrada-saida.component';
import { EntregasComponent } from './paginas/entregas/entregas.component';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { ResidentesComponent } from './paginas/residentes/residentes.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AlterarComponent } from './paginas/alterar/alterar.component';


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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
