import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Evaluación',
    main: [ 
      {
        state: 'Titulouno',
        name: 'Titulo I Disposición G.',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'Capitulouno',
            name: 'Capitulo I Obj,Alc,Amb y Pri'
          },
          {
            state: 'Capitulodos',
            name: 'Capitulo II Definiciones'
          },
          {
            state: 'Capitulotres',
            name: 'Capitulo III Marco de trabajo'
          }
        ]
      },
      {
        state: 'Titulodos',
        name: 'Titulo II Prog. Seg e Info',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'Capitulouno',
            name: 'Capitulo I Gest. Riesg. Tec.'
          },
          {
            state: 'Capitulodos',
            name: 'Capitulo II Marco de Control'
          },
          {
            state: 'Capitulotres',
            name: 'Capitulo III Moni. e Eval.'
          },
          {
            state: 'Capitulocuatro',
            name: 'Capitulo IV Estand. Inter.' 
          },
          {
            state: 'Capitulocinco',
            name: 'Capitulo V Info. de Cumpl.'
          }
        ]
      },
      {
        state: 'Titulotres',
        name: 'Titulo III Cordi. de Resp.',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'Capitulouno',
            name: 'Capitulo I Gobernanza'
          },
          {
            state: 'Capitulodos',
            name: 'Capitulo II Mecanismo de Resp.'
          }
        ]
      },
      {
        state: 'Titulocuatro',
        name: 'Titulo IV Dispo. Finales',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'Capitulouno',
            name: 'Capitulo I Regimen Sencionatorio'
          },
          {
            state: 'Capitulodos',
            name: 'Capitulo II Otras Dispociones'
          }
        ]
      },
    ]
  },
  {
    label: 'Layout',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }/*,
      {
        state: 'prueba',
        name: 'Prueba',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: 'basic',
        name: 'Basic Components',
        type: 'sub',
        icon: 'ti-layout-grid2-alt',
        children: [
          {
            state: 'breadcrumb',
            name: 'Breadcrumbs'
          },
          {
            state: 'button',
            name: 'Button'
          },
          {
            state: 'typography',
            name: 'Typography'
          }
        ]
      },
      {
        state: 'advance',
        name: 'Notifications',
        type: 'link',
        icon: 'ti-crown'
      },*/
    ]
  }/*,
  {
    label: 'FORMS & TABLES',
    main: [
      {
        state: 'forms',
        name: 'Form Components',
        type: 'link',
        icon: 'ti-layers'
      },
      {
        state: 'bootstrap-table',
        name: 'Bootstrap Table',
        type: 'link',
        icon: 'ti-receipt'
      }
    ],
  },
  {
    label: 'Chart And Map',
    main: [
      {
        state: 'map',
        name: 'Maps',
        type: 'link',
        icon: 'ti-map-alt'
      },
      {
        state: 'authentication',
        name: 'Authentication',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'login',
            type: 'link',
            name: 'Login',
            target: true
          },
          {
            state: 'forgot',
            name: 'Forgot Password',
            target: true
          },
          {
            state: 'lock-screen',
            name: 'Lock Screen',
            target: true
          },
        ]
      },
      {
        state: 'error',
        external: 'http://lite.codedthemes.com/flatable/error.html',
        name: 'Error',
        type: 'external',
        icon: 'ti-layout-list-post',
        target: true
      },
      {
        state: 'simple-page',
        name: 'Simple Page',
        type: 'link',
        icon: 'ti-layout-sidebar-left'
      }
    ]
  },
  {
    label: 'Other',
    main: [
      {
        state: '',
        name: 'Menu Levels',
        type: 'sub',
        icon: 'ti-direction-alt',
        children: [
          {
            state: '',
            name: 'Menu Level 2.1',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.2',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.2.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.2.2',
                target: true
              }
            ]
          }, {
            state: '',
            name: 'Menu Level 2.3',
            target: true
          }, {
            state: '',
            name: 'Menu Level 2.4',
            type: 'sub',
            children: [
              {
                state: '',
                name: 'Menu Level 2.4.1',
                target: true
              },
              {
                state: '',
                name: 'Menu Level 2.4.2',
                target: true
              }
            ]
          }
        ]
      }
    ]
  }*/
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
