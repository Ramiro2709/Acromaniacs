import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          { //Ruta de hijo de tab2, crear alumno
            path: 'crear-alumno',
            children: [
              {
                path: '',
                loadChildren: '../crear-alumno/crear-alumno.module#CrearAlumnoPageModule'
              }
            ]
          },
          { //Ruta de hijo de tab2, ver alumnos
            path: 'ver-alumnos',
            children: [
              {
                path: '',
                loadChildren: '../ver-alumnos/ver-alumnos.module#VerAlumnosPageModule'
              }
            ]
          },
          { //Ruta de la pagina tab2
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
