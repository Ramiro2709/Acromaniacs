import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerAlumnosPage } from './ver-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: VerAlumnosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerAlumnosPage]
})
export class VerAlumnosPageModule {}
