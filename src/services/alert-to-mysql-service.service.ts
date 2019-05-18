import { Injectable, Injector } from '@angular/core';
import {MySQLService} from './my-sql.service';
import {GeneralServiceService} from './general-service.service';

import { AlertController,LoadingController, ModalController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertToMysqlServiceService {
  mySQL;
  constructor(public injector: Injector,private alertController: AlertController,private generalService: GeneralServiceService) { 
    this.mySQL = this.injector.get(MySQLService);
  }
  async EliminarAlumnoConfirmAlert(idAlumno){
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar el alumno?',
     // message: 'Ingrese nombre y apellido',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            
            //console.log(this.mySQL)
            this.mySQL.EliminarAlumnoService(idAlumno); 
            this.generalService.UpdateDeletedAlumnos();
          }
        }
      ] 
    });
    return await alert.present();
  }
}
