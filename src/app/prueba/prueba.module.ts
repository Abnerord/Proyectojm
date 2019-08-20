import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PruebaRoutes } from './prueba.routing';
import { PruebaComponent } from './prueba.component';
import {SharedModule} from '../shared/shared.module';
import {BasedatosService} from './basedatos.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PruebaRoutes),
    SharedModule
  ],
  providers:[
    BasedatosService
  ],
  declarations: [PruebaComponent]
})
export class PruebaModule {}
