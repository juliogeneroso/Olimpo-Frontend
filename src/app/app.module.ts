import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EntregasComponent } from './entregas/entregas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ResidentesComponent } from './residentes/residentes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ComunicadosComponent } from './comunicados/comunicados.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConexaoService } from './service/conexao.service';
import { HistoricoComponent } from './historico/historico.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { SalvoComponent } from './avisos/salvo/salvo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletadoComponent } from './avisos/deletado/deletado.component';
import { AlteradoComponent } from './avisos/alterado/alterado.component';
import { ErroComponent } from './avisos/erro/erro.component';
import { AlterarComponent } from './alterar/alterar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    EntregasComponent,
    ResidentesComponent,
    ComunicadosComponent,
    EntradaSaidaComponent,
    HistoricoComponent,
    CadastroComponent,
    SalvoComponent,
    DeletadoComponent,
    AlteradoComponent,
    ErroComponent,
    AlterarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DragDropModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [FormBuilder,ConexaoService,MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
