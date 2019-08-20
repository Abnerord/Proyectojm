import { Routes} from '@angular/router';

import {PruebaComponent} from './prueba.component';

export const PruebaRoutes: Routes = [{
  path: '',
  component: PruebaComponent,
  data: {
    breadcrumb: 'Prueba',
    icon: 'icofont-home bg-c-blue',
    status: false
  }
}];
