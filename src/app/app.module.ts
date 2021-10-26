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
import { EntregasComponent } from './paginas/entregas/entregas.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ResidentesComponent } from './paginas/residentes/residentes.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ComunicadosComponent } from './paginas/comunicados/comunicados.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { EntradaSaidaComponent } from './paginas/entrada-saida/entrada-saida.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConexaoService } from './service/conexao.service';
import { VoiceRecognitionService } from './service/voice.service';
import { HistoricoComponent } from './paginas/historico/historico.component';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { SalvoComponent } from './avisos/salvo/salvo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeletadoComponent } from './avisos/deletado/deletado.component';
import { AlteradoComponent } from './avisos/alterado/alterado.component';
import { ErroComponent } from './avisos/erro/erro.component';
import { AlterarComponent } from './paginas/alterar/alterar.component';
import { JaCadastrado } from './avisos/jaCadastrado/jaCadastrado.component';
import { EntradaComponent } from './paginas/entrada-saida/entrada/entrada.component';
import { SaidaComponent } from './paginas/entrada-saida/saida/saida.component';
import { EntradaTempComponent } from './paginas/entrada-saida/entrada-temp/entrada-temp.component';
import { TempService } from './service/temp.service';


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
    AlterarComponent,
    JaCadastrado,
    EntradaComponent,
    SaidaComponent,
    EntradaTempComponent
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
  providers: [FormBuilder,ConexaoService,MatSnackBar,VoiceRecognitionService,TempService],
  bootstrap: [AppComponent]
})
export class AppModule { }
