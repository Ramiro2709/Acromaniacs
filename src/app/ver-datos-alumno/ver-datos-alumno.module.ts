import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerDatosAlumnoPage } from './ver-datos-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: VerDatosAlumnoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerDatosAlumnoPage]
})
export class VerDatosAlumnoPageModule {}
