import { Routes, RouterModule } from '@angular/router';
import {CapitulounoComponent} from './capitulouno/capitulouno.component';
import {CapitulodosComponent} from './capitulodos/capitulodos.component';
import {CapitulotresComponent} from './capitulotres/capitulotres.component';
import {CapitulocuatroComponent} from './capitulocuatro/capitulocuatro.component';
import {CapitulocincoComponent} from './capitulocinco/capitulocinco.component';

export const Titulodosroutes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Titulo II Del Programa de seguridad cibernética y de la información',
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
      }, {
        path: 'Capitulotres',
        component: CapitulotresComponent,
        data: {
            breadcrumb: 'Capitulo III',
            status: true
        }
    },
    {
      path: 'Capitulocuatro',
      component: CapitulocuatroComponent,
      data: {
          breadcrumb: 'Capitulo IV',
          status: true
      }
  }, {
    path: 'Capitulocinco',
    component: CapitulocincoComponent,
    data: {
        breadcrumb: 'Capitulo V',
        status: true
    }
}, 
    ]
}
];
