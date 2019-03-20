import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSearchAlumnosPage } from './modal-search-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSearchAlumnosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalSearchAlumnosPage]
})
export class ModalSearchAlumnosPageModule {}
