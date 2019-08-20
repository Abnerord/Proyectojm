
import { Routes, RouterModule } from '@angular/router';
import {CapitulounoComponent} from './capitulouno/capitulouno.component';
import {CapitulodosComponent} from './capitulodos/capitulodos.component';

export const Titulocuatroroutes: Routes = [
  {
    path: '',
    data: {
        breadcrumb: 'Titulo IV Disposiciones Finales',
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
