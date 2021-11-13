import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComunicadosComponent } from './paginas/comunicados/comunicados.component';
import { EntradaSaidaComponent } from './paginas/entrada-saida/entrada-saida.component';
import { EntregasComponent } from './paginas/entregas/entregas.component';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { ResidentesComponent } from './paginas/residentes/residentes.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { AlterarComponent } from './paginas/alterar/alterar.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guardasRotas/auth.guard';
import { AuthAdmGuard } from './guardasRotas/auth-adm.guard';



const routes:Routes = [
  {
    path:'',
    component:EntradaSaidaComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'entrada_saida',
    component:EntradaSaidaComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'historico',
    component:HistoricoComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'entregas',
    component: EntregasComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'residentes',
    component:ResidentesComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path:'cadastro',
    component:CadastroComponent,
    canActivate:[AuthAdmGuard],
    canLoad:[AuthAdmGuard]
  },
  {
    path:'comunicados',
    component:ComunicadosComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path: 'alterar/:id', 
    component: AlterarComponent,
    canActivate:[AuthAdmGuard],
    canLoad:[AuthAdmGuard]
  },
  {
    path:'**',
    component:EntradaSaidaComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
