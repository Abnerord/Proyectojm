import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TitulounoComponent} from './titulouno.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import { Titulounoroutes } from './titulouno.routing';
import { CapitulounoComponent } from './capitulouno/capitulouno.component';
import { CapitulodosComponent } from './capitulodos/capitulodos.component';
import { CapitulotresComponent } from './capitulotres/capitulotres.component';


import { BarRatingModule } from "../../../node_modules/ngx-bar-rating";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Titulounoroutes),
    SharedModule,
    BarRatingModule 

  ],
  declarations: [                          
    TitulounoComponent,
    CapitulounoComponent,
    CapitulodosComponent,
    CapitulotresComponent
  ]
})
export class TitulounoModule { }
