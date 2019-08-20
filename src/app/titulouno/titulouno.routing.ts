import { Routes, RouterModule } from '@angular/router';
import {CapitulounoComponent} from './capitulouno/capitulouno.component';
import {CapitulodosComponent} from './capitulodos/capitulodos.component';
import {CapitulotresComponent} from './capitulotres/capitulotres.component';

export const Titulounoroutes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Titulo I Disposición General',
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
    ]
}
];

