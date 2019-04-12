import { Component, OnInit, Injector } from '@angular/core';
import {ModalController } from '@ionic/angular';

import {MySQLService} from '../../services/my-sql.service';

import {VerDatosAlumnoPage} from '../ver-datos-alumno/ver-datos-alumno.page';

@Component({
  selector: 'app-ver-alumnos',
  templateUrl: './ver-alumnos.page.html',
  styleUrls: ['./ver-alumnos.page.scss'],
})
export class VerAlumnosPage implements OnInit {
  MySql;
  alumnos: string[];
  alumnosMartes: string[];
  alumnosLunes : string[];
  constructor(public injector: Injector, private modalController: ModalController) { 
    
  }

  //Se carga cuando entra la vista
  ionViewWillEnter(){
    console.log("Entro vista");
    this.IniciarAlumnos();
  }

  ngOnInit() {
    this.MySql = this.injector.get(MySQLService);
    this.IniciarAlumnos();
    
    console.log(this.alumnos[0]);

    /*
    this.alumnosLunes = new Array();
    this.alumnosMartes = new Array();

    console.log((Object.keys(this.alumnos).length - 1));
    for (let i=0;i < (Object.keys(this.alumnos).length - 1);i++){
      if (this.alumnos[i]['horarioLunes'] != "false"){
        this.alumnosLunes.push(this.alumnos[i]);
      }
      if (this.alumnos[i]['horarioMartes'] != "false"){
        this.alumnosMartes.push(this.alumnos[i]);
      }
    }
    console.log(this.alumnosLunes[0]);
    //console.log(this.alumnosMartes);
    */
  }

  public IniciarAlumnos(){
    this.alumnos = this.MySql.AlumnosArray;
    console.log(this.alumnos);
  }

  async VerDatosAlumno(alumno) {
    console.log(alumno);
    const modal = await this.modalController.create({
      component: VerDatosAlumnoPage,
      componentProps: { alumno: alumno }
    });
    await modal.present();
  }

}
