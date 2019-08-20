import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitulodosComponent} from './titulodos.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import {Titulodosroutes } from './titulodos.routing';
import { CapitulounoComponent } from './capitulouno/capitulouno.component';
import { CapitulodosComponent } from './capitulodos/capitulodos.component';
import { CapitulotresComponent } from './capitulotres/capitulotres.component';
import { CapitulocuatroComponent } from './capitulocuatro/capitulocuatro.component';
import { CapitulocincoComponent } from './capitulocinco/capitulocinco.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Titulodosroutes),
    SharedModule
  ],
  declarations: [
    TitulodosComponent,
    CapitulounoComponent,
    CapitulodosComponent,
    CapitulotresComponent,
    CapitulocuatroComponent,
    CapitulocincoComponent
  ]
})
export class TitulodosModule { }
