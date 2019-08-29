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

import { BarRatingModule } from "../../../node_modules/ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Titulodosroutes),
    SharedModule,
    BarRatingModule
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
