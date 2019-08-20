
import { Routes, RouterModule } from '@angular/router';
import {CapitulounoComponent} from './capitulouno/capitulouno.component';
import {CapitulodosComponent} from './capitulodos/capitulodos.component';

export const Titulotresroutes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Titulo III Coordinación Sectorial De Respuesta A Incidentes De Seguridad Cibernética',
        status: false
    },
    children: [
        {
            path: 'Capitulouno',
            component: CapitulounoComponent,
            data: {
                breadcrumb: 'Capitulo I',
                status: true
            }
        },
        {
          path: 'Capitulodos',
          component: CapitulodosComponent,
          data: {
              breadcrumb: 'Capitulo II',
              status: true
          }
      }, 
    ]
}
];

