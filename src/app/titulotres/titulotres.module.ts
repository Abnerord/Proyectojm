import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitulotresComponent} from './titulotres.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import { Titulotresroutes } from './titulotres.routing';
import { CapitulounoComponent } from './capitulouno/capitulouno.component';
import { CapitulodosComponent } from './capitulodos/capitulodos.component';


import { BarRatingModule } from "../../../node_modules/ngx-bar-rating";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Titulotresroutes),
    SharedModule,
    BarRatingModule,
  ],
  declarations: [
    TitulotresComponent,
    CapitulounoComponent,
    CapitulodosComponent
  ]
})
export class TitulotresModule { }
